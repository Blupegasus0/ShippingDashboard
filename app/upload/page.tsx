'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
    setUploadSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      setUploadSuccess(response.ok);
    } catch (error) {
      console.error('Upload failed', error);
      setUploadSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      <Navbar pageName="Upload" />
      <div className="max-w-xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Upload CSV File</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                       file:rounded file:border-0 file:text-sm file:font-semibold
                       file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
          />

          <button
            type="submit"
            disabled={!file || loading}
            className={`w-full px-4 py-2 text-white rounded transition ${
              loading || !file
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {loading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {uploadSuccess && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-md">
            <p className="mb-2">File uploaded successfully!</p>
            <button
              onClick={handleNavigate}
              className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-gray-700"
            >
              Go to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
