import insightface
from insightface.app import FaceAnalysis

print("Loading ArcFace model...")
app = FaceAnalysis(name='buffalo_l', providers=['CPUExecutionProvider'])
app.prepare(ctx_id=0, det_size=(640, 640))
print("Model loaded successfully ✅")
