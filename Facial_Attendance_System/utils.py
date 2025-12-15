import cv2
import numpy as np
import insightface
from insightface.app import FaceAnalysis

# Initialize once globally
app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))

def image_to_rgb_array(file_bytes: bytes):
    """Convert uploaded bytes to RGB image."""
    arr = np.frombuffer(file_bytes, np.uint8)
    img = cv2.imdecode(arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Invalid image.")
    rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    return rgb

def extract_best_embedding(rgb_image):
    """Extract ArcFace 512D embedding of the most prominent face."""
    faces = app.get(rgb_image)
    if not faces:
        return None
    # Pick largest detected face
    areas = [(f.bbox[2]-f.bbox[0])*(f.bbox[3]-f.bbox[1]) for f in faces]
    idx = int(np.argmax(areas))
    return faces[idx].normed_embedding.astype(np.float32)

def match_embedding(known_embeds: np.ndarray, target_embed: np.ndarray):
    """Compute cosine similarity between embeddings."""
    sims = np.dot(known_embeds, target_embed)  # since they’re normalized
    best_idx = int(np.argmax(sims))
    best_score = sims[best_idx]
    return best_idx, best_score, sims
