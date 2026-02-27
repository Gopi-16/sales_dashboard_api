Project Title: **Sales Dashboard**

   A sales dashboard bult using FastAPI for backend and HTML,Java Script, D3.js for frontend. 
The Dashboard visualizes the sales data using d3.js and fo interactivity filiter are used.

**Features:** 

  -- View all sales Record
  
  -- Filter sales by:
  
      *Date Range
      
      *Product Category
      
      *Region
  
  -- Line chart for sales over time 
  
  -- Bar Chart for product category and Region filter
  
  -- FastAPI is used for Backend Integration
  
  -- D3.js for Visualization
  
**Technologies Used**
  ###Frontend 
  
    --HTML
    
    --Java script
    
    --CSS
    
    --D3.js


  ###Backend
  
    --FastAPI
    
    --REST API

**Project Structure**

Project/

├── Backend/

│   ├── controllers/

│   │   ├── preprocess_controllers.py

│   │   ├── sales_controllers.py

│   │   └── sales_data_controllers.py

│   ├── models/

│   ├── routes/

│   │   ├── health_route.py

│   │   ├── preprocess.py

│   │   ├── sales_aggregate.py

│   │   └── sales_data.py

│   ├── storage/

│   │   └── memory_storage.py

│   └── index.py

├── Frontend/

│   └── src/

│       ├── dashboard.html

│       └── home.html

├── utils/

│   ├── linechart.js

│   ├── barchart.js

│   ├── productCategory.js

│   ├── sales_data.js

│   ├── health_check.js

│   └── upload.js

└── .gitignore
```


## How to run the Project


## 1 Run The Backend
    -- cd Backend
    -- uvicorn index:app 
    
** Backend will run at http://127.0.0.1:8000

## 2 Run the Frontend
    -- Open home.html 


**## API Endpoints ##**


| Method | Endpoint | Description |
|--------|----------|------------|
| POST | /preprocess | Preprocess the uploaded csv file  |
| GET | /health | Verifies the integration between frontend and backend|
| GET | /sales | Get all sales data |
| GET | /sales?start_date=&end_date= | Filter by date |
| GET | /sales/aggregate?group_by=region | Region aggregation |
| GET | /sales/aggregate?group_by=product_category | Product category aggregation |


## Visualizations

- Line Chart → Sales over Time
- Bar Chart → Sales by Region
- Bar Chart → Sales by Product Category

** Summary **
   The user need to upload the sales csv file which contains the sales_date,product_category,region in the home page .After the upload the csv file is preprocess using the preprocess route.If the csv file is have required columns then navigates to the dashboard page which consits of the connection check button for health route.It consits the filter which filter data by region,date range,product category and have a sales data display. Region,Product category and Date range is shown using d3 package for bar chart and linechart visualization the respectively.
