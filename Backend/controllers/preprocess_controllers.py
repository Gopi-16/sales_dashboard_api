from fastapi import FastAPI ,File,UploadFile
import pandas as pd
import io
import uuid
from storage.memory_storage import data_store

async def preprocess_controller(file: UploadFile=File(...)):
     
    try:
        contents= await file.read()
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
        df.columns = (
        df.columns
        .str.strip()
        .str.lower()
)
        if "sale_date" in df.columns:
            df["sale_date"] = pd.to_datetime(df["sale_date"])
        null_counts=df.isnull().sum().to_dict()

        numeric_cols = df.select_dtypes(include=["int64", "float64"]).columns
        df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

        

        session_id=str(uuid.uuid4())
        data_store[session_id]=df

        return {"message": "Preprocessing completed successfully!", "null_counts": null_counts, "session_id": session_id}
    except Exception as e:
        return {"message": f"An error occurred during preprocessing: {str(e)}"}


