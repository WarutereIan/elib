import React, { useState } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { log } from "console";

// Categories to match backend
const BOOK_CATEGORIES = ["Sciences", "Mathematics", "Languages"];

const BookUploader = () => {
  const [bookFile, setBookFile] = useState(null);
  const [bookName, setBookName] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setBookFile(file);
  };

  const handleBookUpload = async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate all fields
    if (!bookFile || !bookName || !category) {
      setUploadStatus("Please fill in all book details");
      return;
    }

    const formData = new FormData();
    formData.append("file", bookFile);
    formData.append("bookName", bookName);
    formData.append("category", category);

    console.log(formData.entries());

    try {
      setUploadStatus("");
      const response = await axios.post(
        "http://localhost:5000/admin/upload-book",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log(response);

      setUploadStatus(`${response.data.message}`);
      setUploadProgress(100);

      // Reset form
      setBookFile(null);
      setBookName("");
      setCategory("");
      setSubject("");
      event.target.reset(); // Reset file input
    } catch (error) {
      console.log(error);

      setUploadStatus(
        `Upload failed: ${error.response?.data?.message || "Unknown error"}`
      );
      setUploadProgress(0);
    }
  };

  return (
    <form onSubmit={handleBookUpload} className="book-uploader">
      <div className="form-group grid grid-cols-2">
        <label>Book Name</label>
        <input
          type="text"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          placeholder="Enter book name"
          required
          className="w-full "
        />
      </div>

      <div className="form-group grid grid-cols-2 mt-2">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {BOOK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-2">
        <input
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.doc,.docx"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={!bookFile || !bookName || !category}
        className="mt-2"
      >
        Upload Book
      </Button>

      {uploadStatus && (
        <div className="upload-status">
          {uploadStatus}
          {uploadProgress > 0 && (
            <div
              className="progress-bar"
              style={{ width: `${uploadProgress}%` }}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default BookUploader;
