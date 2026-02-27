//const API = "http://127.0.0.1:8000";
const id = localStorage.getItem("session_id");
async function fetchBarChartData() {
    try{
            const response= await fetch(`http://127.0.0.1:8000/sales/aggregate?session_id=${id}&group_by=region`)
            const data = await response.json();
            data.forEach(d => {
                d.total_sales = +d.total_sales;
            
            const svg = d3.select("#barchart");
            svg.selectAll("*").remove();
            //const svg = d3.select("#barchart");
            const width = svg.node().getBoundingClientRect().width;
            const height = svg.node().getBoundingClientRect().height;

            const margin = { top: 30, right: 30, bottom: 50, left: 60 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleBand()
                .domain(data.map(d => d.key))
                .range([0, innerWidth])
                .padding(0.3);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total_sales)])
                .nice()
                .range([innerHeight, 0]);

            g.append("g")
                .attr("transform", `translate(0,${innerHeight})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y));

            g.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.key))
                .attr("y", d => y(d.total_sales))
                .attr("width", x.bandwidth())
                .attr("height", d => innerHeight - y(d.total_sales))
                .attr("fill", "#4e73df");
        });}
    catch(err){
        console.error(err); 

    }}
fetchBarChartData();