import io
from datetime import datetime, timezone, date
from typing import List, Optional
import numpy as np
from fastapi import FastAPI, UploadFile, Form, HTTPException, Query
from fastapi.responses import HTMLResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, select
from sqlalchemy.orm import sessionmaker
from models import Base, Student, Attendance
from utils import image_to_rgb_array, extract_best_embedding, match_embedding
import pandas as pd
import os

# -------------------------------------------------------------------
# FASTAPI SETUP
# -------------------------------------------------------------------
app = FastAPI(title="Face Attendance (ArcFace + FastAPI)")
app.mount("/static", StaticFiles(directory="static"), name="static")

# Database connection
os.makedirs("data", exist_ok=True)
engine = create_engine("sqlite:///data/attendance.db", echo=False, future=True)
Session = sessionmaker(bind=engine, expire_on_commit=False)


# -------------------------------------------------------------------
# HTML PAGES
# -------------------------------------------------------------------
@app.get("/", response_class=HTMLResponse)
def home():
    """Attendance Page"""
    with open("static/attendance.html", "r", encoding="utf-8") as f:
        return HTMLResponse(f.read())


@app.get("/enroll", response_class=HTMLResponse)
def enroll_page():
    """Enrollment Page"""
    with open("static/enroll.html", "r", encoding="utf-8") as f:
        return HTMLResponse(f.read())


# -------------------------------------------------------------------
# ENROLLMENT API
# -------------------------------------------------------------------
@app.post("/api/enroll")
async def enroll(
    name: str = Form(...),
    roll_no: str = Form(...),
    section: str = Form(...),
    files: List[UploadFile] = None
):
    """Enroll a new student (multiple photos allowed)."""
    if not files or len(files) == 0:
        raise HTTPException(status_code=400, detail="Upload at least one image.")

    embeddings = []
    for f in files:
        rgb = image_to_rgb_array(await f.read())
        emb = extract_best_embedding(rgb)
        if emb is not None:
            embeddings.append(emb)

    if not embeddings:
        raise HTTPException(status_code=400, detail="No faces detected in uploaded images.")

    # Average multiple embeddings to get a stable representation
    representative = np.mean(np.stack(embeddings, axis=0), axis=0)

    with Session() as s:
        existing = s.execute(select(Student).where(Student.roll_no == roll_no)).scalar_one_or_none()
        if existing:
            existing.name = name
            existing.section = section
            existing.embedding = representative.tobytes()
        else:
            s.add(Student(name=name, roll_no=roll_no, section=section, embedding=representative.tobytes()))
        s.commit()

    return {
        "ok": True,
        "name": name,
        "roll_no": roll_no,
        "section": section,
        "images_used": len(embeddings)
    }


# -------------------------------------------------------------------
# MARK ATTENDANCE API
# -------------------------------------------------------------------
@app.post("/api/mark")
async def mark_attendance(
    frame: UploadFile,
    device_id: str = Form("webcam-1"),
    threshold: float = Form(0.35),       # cosine similarity threshold
    section_hint: Optional[str] = Form(None)
):
    """Recognize a face and mark attendance."""
    rgb = image_to_rgb_array(await frame.read())
    emb = extract_best_embedding(rgb)
    if emb is None:
        return {"ok": False, "msg": "No face found in the frame."}

    with Session() as s:
        # Limit search to section if given
        if section_hint:
            students = s.execute(select(Student).where(Student.section == section_hint)).scalars().all()
        else:
            students = s.execute(select(Student)).scalars().all()

        if not students:
            raise HTTPException(status_code=400, detail="No enrolled students found.")

        known_embeddings = np.stack([np.frombuffer(st.embedding, dtype=np.float32) for st in students], axis=0)
        idx, sim, _ = match_embedding(known_embeddings, emb)

        # Compare cosine similarity (higher = better)
        if sim < threshold:
            return {"ok": False, "msg": f"Unknown face (similarity={sim:.3f} < {threshold})."}

        st = students[idx]
        s.add(Attendance(
            student_id=st.id,
            timestamp=datetime.now(timezone.utc),
            status="present",
            device_id=device_id,
            section=st.section
        ))
        s.commit()

        return {
            "ok": True,
            "name": st.name,
            "roll_no": st.roll_no,
            "section": st.section,
            "similarity": round(float(sim), 3)
        }


# -------------------------------------------------------------------
# FETCH TODAY'S ATTENDANCE
# -------------------------------------------------------------------
@app.get("/api/today")
def list_today(section: Optional[str] = Query(None)):
    """Return today's attendance (filtered by section if provided)."""
    today = date.today()
    start = datetime(today.year, today.month, today.day, tzinfo=timezone.utc)
    end = datetime(today.year, today.month, today.day, 23, 59, 59, tzinfo=timezone.utc)

    with Session() as s:
        q = s.query(Attendance).filter(Attendance.timestamp >= start, Attendance.timestamp <= end)
        if section:
            q = q.filter(Attendance.section == section)
        rows = [
            {
                "id": a.id,
                "name": a.student.name,
                "roll_no": a.student.roll_no,
                "section": a.section,
                "timestamp": a.timestamp.isoformat(),
                "status": a.status,
                "device_id": a.device_id
            }
            for a in q.all()
        ]
    return rows


# -------------------------------------------------------------------
# EXPORT ATTENDANCE TO CSV
# -------------------------------------------------------------------
@app.get("/api/export_csv")
def export_csv(section: Optional[str] = Query(None)):
    """Export all (or section-specific) attendance to CSV."""
    with Session() as s:
        q = s.query(Attendance)
        if section:
            q = q.filter(Attendance.section == section)
        rows = [
            {
                "id": a.id,
                "name": a.student.name,
                "roll_no": a.student.roll_no,
                "section": a.section,
                "timestamp": a.timestamp.isoformat(),
                "status": a.status,
                "device_id": a.device_id
            }
            for a in q.all()
        ]
    df = pd.DataFrame(rows)
    buf = io.StringIO()
    df.to_csv(buf, index=False)
    buf.seek(0)
    filename = f"attendance{'_'+section if section else ''}.csv"
    return StreamingResponse(
        iter([buf.getvalue().encode()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )
