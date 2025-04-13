'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function UploadPage () {
    const [file, setFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    const router = useRouter();

    function handleFileChange(event) {
        setFile(event.target.files[0]);
        setUploadSuccess(false);
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
            console.log('File processed successfully');
            setUploadSuccess(true);
        } else {
            console.error('File processing failed');
            setUploadSuccess(false);
        }
    }

    function handleNavigate() {
        router.push('/dashboard');
    }

    return (
    <div>
        <h1> Upload CSV File </h1>
        <form onSubmit={handleSubmit}>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button type='submit'>Upload</button>
        </form>

        { uploadSuccess && (
            <div>
                    <p>File uploaded successfully!</p>
                    <button onClick={handleNavigate}>Go to Dashboard</button>
                </div>
        )}
    </div>
    );
}

export default UploadPage;
