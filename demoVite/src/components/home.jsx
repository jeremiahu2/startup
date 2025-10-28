import {useState} from "react";

export default function Home() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return alert("Please enter an email!");
    localStorage.setItem("email", email);
    alert(`Welcome, ${email}!`);
  }

  function handleLogout() {
    localStorage.removeItem("email");
    setEmail("");
    setPassword("");
  }

  return (
    <main className="container text-center">
      <h1 className="mb-3">Welcome to the Pie Vote App</h1>
      <p className="lead mb-4">
        Vote on your favorite pie flavor, see popular flavors, and chat with other pie fans!
      </p>

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
          <button type="submit" className="btn btn-primary">Login</button>
          <button type="button" className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      </form>
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span><br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
