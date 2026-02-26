const API = "http://127.0.0.1:8000";
const session_id = localStorage.getItem("session_id");

function fetchProductCategoryLineChart() {

    // Clear old chart
    d3.select("#linechart").selectAll("*").remove();

    fetch(`${API}/sales/aggregate?session_id=${session_id}&group_by=product_category`)
        .then(res => res.json())
        .then(data => {

            if (!data || data.length === 0) {
                console.log("No data returned");
                return;
            }

            // Convert numeric values
            data.forEach(d => {
                d.total_sales = +d.total_sales;
            });

            const svg = d3.select("#linechart");
            const margin = { top: 20, right: 30, bottom: 60, left: 60 };

            const width = svg.node().getBoundingClientRect().width - margin.left - margin.right;
            const height = svg.node().getBoundingClientRect().height - margin.top - margin.bottom;

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // X scale (CATEGORICAL)
            const x = d3.scalePoint()
                .domain(data.map(d => d.key))
                .range([0, width])
                .padding(0.5);

            // Y scale (NUMERIC)
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total_sales)])
                .nice()
                .range([height, 0]);

            // X Axis
            g.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-30)")
                .style("text-anchor", "end");

            // Y Axis
            g.append("g")
                .call(d3.axisLeft(y));

            // Line generator
            const line = d3.line()
                .x(d => x(d.key))
                .y(d => y(d.total_sales));

            // Draw line
            g.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 2)
                .attr("d", line);

            // Add dots
            g.selectAll("circle")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", d => x(d.key))
                .attr("cy", d => y(d.total_sales))
                .attr("r", 4)
                .attr("fill", "steelblue");
        })
        .catch(error => {
            console.error("Error fetching product category data:", error);
        });
}