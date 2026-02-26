from fastapi import APIRouter,Query
from typing import Optional
from controllers.sales_controllers import aggregate_sales
router=APIRouter(prefix="/sales",tags=["sales"])

@router.get("/aggregate")
async def aggregate(
    session_id: str = Query(...),
    group_by: str = Query(...),
    start_date: Optional[str] = Query(None),
    end_date: Optional[str] = Query(None),
):
    return aggregate_sales(
        session_id=session_id,
        group_by=group_by,
        start_date=start_date,
        end_date=end_date
    )