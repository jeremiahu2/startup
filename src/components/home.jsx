import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [quote, setQuote] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("email"));

  async function getQuote() {
    try {
      const response = await fetch("/api/quote");
      const data = await response.json();
      setQuote(data.content || "No quote available");
    } catch (err) {
      console.error("Error fetching quote:", err);
    }
  }

  useEffect(() => {
    getQuote();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        localStorage.setItem("email", email);
        setLoggedIn(true);
        alert(`Welcome, ${email}!`);
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.msg}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed — check the console for details.");
    }
  }

  async function handleLogout() {
    try {
      await fetch("/api/logout", { method: "POST" });
    } catch (err) {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("email");
    setEmail("");
    setPassword("");
    setLoggedIn(false);
  }

  async function handleRegister() {
    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      if (response.ok) {
        alert("Registration successful! You can now log in.");
      } else {
        const error = await response.json();
        alert(`Registration failed: ${error.msg}`);
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Registration failed — check the console for details.");
    }
  }

  return (
    <main className="container text-center">
      <h1 className="mb-3">Welcome to the Pie Vote App</h1>
      <p className="lead mb-4">
        Vote on your favorite pie flavor, see popular flavors, and chat with other pie fans!
      </p>
      {loggedIn ? (
        <>
          <h3>Hi, {email}!</h3>
          <p className="fst-italic">{quote}</p>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "400px" }}>
          <div className="mb-3 input-group">
            <span className="input-group-text">@</span>
            <input
              type="text"
              className="form-control"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text">🔒</span>
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <button type="button" className="btn btn-success" onClick={handleRegister}>
              Register
            </button>
          </div>
        </form>
      )}
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span>
        <br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
