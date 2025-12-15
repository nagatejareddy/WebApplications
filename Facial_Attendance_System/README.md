# Face Attendance (FastAPI + face_recognition)

## Quickstart
```
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
pip install --upgrade pip
pip install -r requirements.txt

python db_init.py
uvicorn app:app --reload
```
- Enroll: http://127.0.0.1:8000/enroll
- Attendance: http://127.0.0.1:8000/

## Tips
- Enroll 3–5 images per student (front, slight left/right).
- Default threshold = 0.5 (lower is stricter).
- Use good lighting for better accuracy.
