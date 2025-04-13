'use client'
import { useState } from 'react';

function UploadPage () {
    const [file, setFile] = useState(null);

    function handleFileChange(event) {
        setFile(event.target.files[0]);
    }

    async function handleSubmit (event) {
        event.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log('File uploaded successfully');
        } else {
            console.error('File upload failed');
        }
    }

    return (
    <div>
        <h1> Upload CSV File </h1>
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type='submit'>Upload</button>
        </form>
    </div>
    );
}

export default UploadPage;
