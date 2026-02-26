const API="http://127.0.0.1:8000";
const session_id = localStorage.getItem("session_id");

fetch(`${API}/sales/aggregate?session_id=${session_id}&group_by=region`)
    .then(res=>res.json())
    .then(data=>{
        data.forEach(d=>{
            d.total_sales=+d.total_sales;
        });

        const svg=d3.select("#barchart");
        const margin={top:20,right:30,bottom:40,left:60};
        const width=+svg.attr("width")-margin.left-margin.right;
        const height=+svg.attr("height")-margin.top-margin.bottom;
        const g=svg.append("g").attr("transform",`translate(${margin.left},${margin.top})`);

        const x=d3.scaleBand()
            .domain(data.map(d=>d.key))
            .range([0,width])
            .padding(0.2);
        const y=d3.scaleLinear()
            .domain([0,d3.max(data,d=>d.total_sales)])
            .nice()
            .range([height,0]);

        g.append("g")
            .attr("transform",`translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class","bar")
            .attr("x",d=>x(d.key))
            .attr("y",d=>y(d.total_sales))
            .attr("width",x.bandwidth())
            .attr("height",d=>height-y(d.total_sales))
            .attr("fill","steelblue");      
    });