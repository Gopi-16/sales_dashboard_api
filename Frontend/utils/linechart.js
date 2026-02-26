const API="http://127.0.0.1:8000";
const session_id = localStorage.getItem("session_id");
function fetchLineChartData() {
    const startDateInput = document.getElementById("startDate");
    const endDateInput = document.getElementById("endDate");
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    fetch(`${API}/sales/aggregate?session_id=${session_id}&group_by=sale_date&start_date=${startDate}&end_date=${endDate}`)
        .then(res=>res.json())
        .then(data=>{
            data.forEach(d=>{
                d.key=new Date(d.key);
                d.total_sales=+d.total_sales;
            });
            const svg=d3.select ("#linechart");
            const margin ={top:1,right:2,bottom:20,left:50};
            const width = (svg.node().getBoundingClientRect().width - margin.left - margin.right) *2;
            const height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;
            
            const g=svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);
            const x=d3.scaleTime()
                .domain(d3.extent(data,d=>d.key))
                .range([0,width]);
            const y=d3.scaleLinear()
                .domain([0,d3.max(data,d=>d.total_sales)])
                .nice()
                .range([height,0]);

            g.append("g")
                .attr("transform",`translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y));

            const line=d3.line()
                .x(d=>x(d.key))
                .y(d=>y(d.total_sales));

            g.append("path")
                .datum(data)
                .attr("fill","none")
                .attr("stroke","steelblue")
                .attr("stroke-width",2)
                .attr("d",line);
        });
}
fetchLineChartData();