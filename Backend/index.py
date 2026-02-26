from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import sales_aggregate
from routes import preprocess 
from routes import health_route
from routes import sales_data
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(preprocess.router)   
app.include_router(health_route.router)
app.include_router(sales_aggregate.router)
app.include_router(sales_data.router)
