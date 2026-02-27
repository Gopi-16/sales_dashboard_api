async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const message = document.getElementById('message');

    if (fileInput.files.length === 0) {
        message.textContent = "Please select a file to upload.";
        return;
    }

    const file = fileInput.files[0];

    // Corrected check
    if (!file.name.endsWith('.csv')) {
        message.textContent = "Please upload a CSV file.";
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        // Upload the file to the backend API and handle the response to get session ID and redirect to dashboard
        const response = await fetch('http://127.0.0.1:8000/preprocess', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.session_id) {
            localStorage.setItem('session_id', data.session_id);
            console.log('Session ID:', data.session_id);
            message.textContent= `File uploaded successfully. Redirecting to dashboard... Session ID: ${data.session_id}`;
            window.location.href = 'dashboard.html';    // Redirect to dashboard after successful upload
        } else {
            message.textContent = "Upload failed.";
        }

    } catch (error) {
        console.error('Error uploading file:', error);
        message.textContent = "An error occurred while uploading the file.";
    }
}