function health() {
        const statusElement = document.getElementById('connectionStatus');
        fetch('http://127.0.0.1:8000/health')
            
            .then(response => {
                if (response.ok) {
                    statusElement.textContent = 'Connection is healthy!';
                } else {
                    statusElement.textContent = 'Connection failed!';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                statusElement.textContent = 'Connection failed!';
            }); 
    }