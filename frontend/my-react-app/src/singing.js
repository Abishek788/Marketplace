// src/singing.js
import React, { useState } from "react";
import { signIn } from "@aws-amplify/auth"; // ✅ Correct modular import
import { useNavigate } from "react-router-dom";

const Singing = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Correct usage of the modular function
      await signIn({ username, password });
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Sign In</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Singing;
