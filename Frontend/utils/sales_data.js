const sessionId = localStorage.getItem("session_id");

async function fetchSalesData() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/sales?session_id=${sessionId}`);
        const data = await response.json();
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
        } catch (error) {
            console.error("Error fetching sales data:", error);
        }
}
fetchSalesData();