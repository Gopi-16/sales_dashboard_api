from fastapi import HTTPException
from storage.memory_storage import data_store

def aggregate_sales(session_id: str, group_by: str):

    if session_id not in data_store:
        raise HTTPException(status_code=404, detail="Invalid session_id")

    df = data_store[session_id]

    # Validate group_by column
    if group_by not in df.columns:
        raise HTTPException(
            status_code=400,
            detail=f"Column '{group_by}' not found. Available columns: {list(df.columns)}"
        )

    # Validate sales column
    if "sales_amount" not in df.columns:
        raise HTTPException(
            status_code=400,
            detail="Column 'sales_amount' not found"
        )

    result = (
        df.groupby(group_by)["sales_amount"]
        .sum()
        .reset_index()
        .rename(columns={group_by: "key", "sales_amount": "total_sales"})
    )

    return result.to_dict(orient="records")