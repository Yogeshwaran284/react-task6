import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const fileInputRef = useRef(null);

  // useEffect - API Fetch
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // useRef - Image Upload
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="app">
      <h1>Task 6 - useEffect & useRef</h1>

      {/* SECTION 1: IMAGE UPLOAD WITH useRef */}
      <div className="section">
        <h2>Image Upload (useRef Hook)</h2>
        <div className="upload-card">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <button className="btn upload-btn" onClick={handleButtonClick}>
            {image? "Change Image" : "📁 Upload Image"}
          </button>

          {image? (
            <div className="preview">
              <img src={image} alt="Preview" />
              <button className="btn remove-btn" onClick={()=> setImage(null)}>Remove</button>
            </div>
          ) : (
            <p className="no-img">No image selected</p>
          )}
        </div>
      </div>

      {/* SECTION 2: API DATA WITH useEffect */}
      <div className="section">
        <h2>Users List (useEffect API - jsonplaceholder)</h2>

        {loading && <p className="status loading">Loading data...</p>}
        {error && <p className="status error">Error: {error}</p>}

        {!loading &&!error && (
          <div className="user-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-id">ID: {user.id}</div>
                <h3>{user.name}</h3>
                <p><b>Username:</b> {user.username}</p>
                <p><b>Email:</b> {user.email}</p>
                <p><b>Phone:</b> {user.phone}</p>
                <p><b>Website:</b> {user.website}</p>
                <p><b>Company:</b> {user.company.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;