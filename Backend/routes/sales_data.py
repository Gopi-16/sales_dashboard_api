from fastapi import APIRouter, HTTPException
from controllers.sales_data_controllers import sales_data
router = APIRouter(prefix="/sales", tags=["sales"])
@router.get("")

# Endpoint to retrieve preprocessed sales data based on session_id

def get_sales_data(session_id: str):
    return sales_data(session_id)