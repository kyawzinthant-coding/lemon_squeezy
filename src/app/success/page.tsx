import React, { useEffect, useState } from "react";

export default function Success() {
  const [sessionToken, setSessionToken] = useState(null);

  useEffect(() => {
    // Retrieve the session token from localStorage
    const token = localStorage.getItem("sessionToken");
    if (token) {
      setSessionToken(token as SetStateAction<string | null>);
    }
  }, []);

  const handleLogout = () => {
    // Clear the session token on logout
    localStorage.removeItem("sessionToken");
    // Optionally redirect to the home page or login page
    window.location.href = "/";
  };

  return (
    <div>
      <h1>Success</h1>
      {sessionToken ? (
        <div>
          <p>Your payment was successful!</p>
          <p>Your session token is: {sessionToken}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>No session token found. Please try again.</p>
      )}
    </div>
  );
}
