from pydantic import BaseModel
from datetime import datetime

class SalesData(BaseModel):
    date: datetime
    sales: float
    region: str
    product_category: str