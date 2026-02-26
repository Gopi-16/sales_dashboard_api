from fastapi import HTTPException
from storage.memory_storage import data_store
import pandas as pd

def aggregate_sales(session_id: str, group_by: str, start_date=None, end_date=None):

    if session_id not in data_store:
        raise HTTPException(status_code=404, detail="Invalid session_id")

    df = data_store[session_id].copy()

    if group_by not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Column '{group_by}' not found"
        )

    if "quantity_sold" not in df.columns:
        raise HTTPException(
            status_code=400,
            detail="Column 'quantity_sold' not found"
        )

    if start_date and end_date and "sale_date" in df.columns:
        df["sale_date"] = pd.to_datetime(df["sale_date"])
        df = df[
            (df["sale_date"] >= pd.to_datetime(start_date)) &
            (df["sale_date"] <= pd.to_datetime(end_date))
        ]

    result = (
        df.groupby(group_by)["quantity_sold"]
        .sum()
        .reset_index()
        .rename(columns={group_by: "key", "quantity_sold": "total_sales"})
    )

    return result.to_dict(orient="records")