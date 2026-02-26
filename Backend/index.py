from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import sales
from routes import preprocess 
from routes import health_route
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(preprocess.router)   
app.include_router(health_route.router)
app.include_router(sales.router)
