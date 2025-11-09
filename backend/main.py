from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routers
from api.browser_service import router as browser_router

app = FastAPI(title="TechFix API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(browser_router)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "TechFix API is running"}

@app.get("/")
async def root():
    return {"message": "TechFix API - Tech Troubleshooting Assistant"}
