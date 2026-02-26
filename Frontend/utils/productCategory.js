const session = localStorage.getItem("session_id");

function fetchProductCategoryBarChart() {

    const svg = d3.select("#barchart");
    svg.selectAll("*").remove();

    fetch(`http://127.0.0.1:8000/sales/aggregate?session_id=${session}&group_by=product_category`)
        .then(res => res.json())
        .then(data => {

            console.log("DATA:", data);

            data.forEach(d => {
                d.total_sales = +d.total_sales;
            });

            const svgWidth = 600;
            const svgHeight = 500;

            svg.attr("width", svgWidth)
               .attr("height", svgHeight);

            const margin = { top: 20, right: 30, bottom: 60, left: 80 };
            const width = svgWidth - margin.left - margin.right;
            const height = svgHeight - margin.top - margin.bottom;

            const g = svg.append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const x = d3.scaleBand()
                .domain(data.map(d => d.key))
                .range([0, width])
                .padding(0.3);

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total_sales)])
                .range([height, 0]);

            g.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x));

            g.append("g")
                .call(d3.axisLeft(y));

            g.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.key))
                .attr("y", d => y(d.total_sales))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.total_sales))
                .attr("fill", "steelblue");

        })
        .catch(err => console.error(err));
}