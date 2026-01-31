// https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
// defunct; has been integrated into upload.jsx

import React, { useState } from "react";

const App = () => {
  // represents the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // when the user chooses the file
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  // when the user uploads a file
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("myFile", selectedFile, selectedFile.name);
    console.log(selectedFile);
    // send to database here
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  );
};

export default App;
