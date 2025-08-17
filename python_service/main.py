from fastapi import FastAPI
from secret_config import AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, SERVICE_API_KEY

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok", "service": "python_service"}

@app.get("/enrich")
def enrich(item: str):
    # Dummy "enrichment" that references a fake key to keep it in code paths
    used = f"{SERVICE_API_KEY[:6]}..."
    return {"item": item, "enriched": True, "using_key": used}
