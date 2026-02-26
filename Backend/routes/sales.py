from fastapi import APIRouter,Query
from controllers.sales_controllers import aggregate_sales
router=APIRouter(prefix="/sales",tags=["sales"])
@router.get("/aggregate")
async def aggregate(session_id:str=Query(...),group_by:str=Query(...)):
    return aggregate_sales(session_id=session_id,group_by=group_by)