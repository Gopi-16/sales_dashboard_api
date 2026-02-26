from fastapi import HTTPException
from storage.memory_storage import data_store

def sales_data(session_id: str):
    try:
        if session_id not in data_store:
            raise HTTPException(status_code=404, detail="Invalid session_id")

        df = data_store[session_id].copy()
        return df.to_dict(orient="records")
    except KeyError:
        raise HTTPException(status_code=404, detail="Session not found")    
