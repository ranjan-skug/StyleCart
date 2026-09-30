import React, { useState } from "react";
// import axios from "axios";

const UploadProductsCSV = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".csv")) {
      setMessage("Please select a CSV file");
      setFile(null);
      return;
    }
    console.log(
      "selectedFile===========================================================>01",
    );
    console.log(selectedFile);
    setFile(selectedFile);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a CSV file");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", file);

      console.log("formData=========================================>02");
      console.log(formData);

      //   const response = await axios.post(
      //     "http://localhost:3000/api/products/upload-csv",
      //     formData,
      //     {
      //       headers: {
      //         "Content-Type": "multipart/form-data",
      //       },
      //     },
      //   );

      //   setMessage(response.data.message);
      setFile(null);
    } catch (error) {
      //   setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Upload Products CSV</h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="w-full border p-3 rounded"
      />

      {file && (
        <p className="mt-3 text-sm text-gray-600">Selected: {file.name}</p>
      )}

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-5 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Products"}
      </button>

      {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default UploadProductsCSV;
