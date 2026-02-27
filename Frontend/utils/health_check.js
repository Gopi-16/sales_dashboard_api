async function health() {
        const statusElement = document.getElementById('connectionStatus');
        try {
                // Health check API call to backend which return connection status to backend
            const response= await fetch('http://127.0.0.1:8000/health')
            if(response.ok) {
                statusElement.textContent = 'Connection is healthy!';
            } else {
                statusElement.textContent = 'Connection failed!';
            }
            
        } catch (error) {
                console.error('Error:', error);
                statusElement.textContent = 'Connection failed!';
            }; 
    }