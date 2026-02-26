const sessionId = localStorage.getItem("session_id");

function fetchSalesData() {
    fetch(`http://127.0.0.1:8000/sales?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
            const tableBody = document.getElementById("salesTableBody");
            console.log("Fetched sales data:", data);
            tableBody.innerHTML = "";
            data.forEach(sale => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${sale.product_id}</td>
                    <td>${sale.product_category}</td>
                    <td>${sale.quantity_sold}</td>
                    <td>${sale.sale_date}</td>
                    <td>${sale.region}</td>
                `;
                tableBody.appendChild(row);
            });
        });
}