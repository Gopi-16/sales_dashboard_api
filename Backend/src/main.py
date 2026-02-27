from fastapi import FastAPI

app = FastAPI()

@app.get("/")

# Basic health check endpoint to verify that the backend is running trail 

def read_root():
    return {"message": "Backend is working!"}