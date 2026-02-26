from fastapi import APIRouter, HTTPException
from controllers.sales_data_controllers import sales_data
router = APIRouter(prefix="/sales", tags=["sales"])
@router.get("")
def get_sales_data(session_id: str):
    return sales_data(session_id)