from fastapi import APIRouter,Query,File,UploadFile
from controllers.preprocess_controllers import preprocess_controller
router=APIRouter(prefix="/preprocess",tags=["preprocess"])
@router.post("")
async def preprocess(file:UploadFile=File(...)):
    return await preprocess_controller(file=file)
