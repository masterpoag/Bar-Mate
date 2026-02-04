import React from "react";

export default function HomePage({ darkMode }) {
  const containerStyle = {
    minHeight: "100vh",
    width: "100vw",
    padding: "2rem",
    boxSizing: "border-box",
    background: darkMode ? "#121212" : "#f5f5f5",
    color: darkMode ? "#f5f5f5" : "#121212",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    transition: "all 0.3s",
  };

  const headingStyle = {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  };

  const paragraphStyle = {
    fontSize: "1.2rem",
    maxWidth: "600px",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: darkMode ? "#61dafb" : "#0077cc",
    textDecoration: "none",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "0.6rem 1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: darkMode ? "#61dafb" : "#0077cc",
    color: "#fff",
    fontWeight: "bold",
    marginTop: "1rem",
    transition: "all 0.3s",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to Bar Mate 🍹</h1>
      <p style={paragraphStyle}>
        This is an open source project that I'm hosting for free. You can explore cocktails, 
        search by ingredients, and see what you can make with your bar stock.
      </p>
      {/* <p style={paragraphStyle}>
        If you like this project and want to support it, you can{" "}
        <a
          href="https://www.paypal.com/donate" // replace with your actual donation link
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          donate
        </a>.
      </p> */}
      <p style={paragraphStyle}>
        You can also contribute to this project on{" "}
        <a
          href="https://github.com/masterpoag/Bar-Mate/tree/main" // replace with your GitHub URL
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          GitHub
        </a>.
      </p>
      <a
        href="https://github.com/masterpoag/Bar-Mate/tree/main"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button style={buttonStyle}>Contribute on GitHub</button>
      </a>
    </div>
  );
}
