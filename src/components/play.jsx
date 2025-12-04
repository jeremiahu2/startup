import React, { useEffect, useState } from "react";

export default function Play() {
  const [selectedPie, setSelectedPie] = useState("");
  const [votes, setVotes] = useState({});
  const fetchVotes = async () => {
    try {
      const res = await fetch("/api/votes");
      const data = await res.json();
      setVotes(data);
    } catch (err) {
      console.error("Failed to fetch votes:", err);
    }
  };
  useEffect(() => {
    fetchVotes();
  }, []);

  async function handleVote(e) {
    e.preventDefault();
    if (!selectedPie) return alert("Please select a pie!");
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pieFlavor: selectedPie }),
      });
      const data = await res.json();
      alert(data.msg);
      fetchVotes();
    } catch (err) {
      console.error("Vote error:", err);
      alert("Failed to submit vote");
    }
  }

  return (
    <main className="container text-center">
      <h1 className="mb-3">Vote for Your Favorite Pie</h1>
      <form onSubmit={handleVote} className="mx-auto" style={{ maxWidth: "400px" }}>
        {["apple", "pumpkin", "cherry", "peach"].map((pie) => (
          <div key={pie} className="mb-3 form-check">
            <input
              className="form-check-input"
              type="radio"
              name="pie"
              id={pie}
              value={pie}
              checked={selectedPie === pie}
              onChange={(e) => setSelectedPie(e.target.value)}
            />
            <label className="form-check-label" htmlFor={pie}>
              {pie[0].toUpperCase() + pie.slice(1)} Pie
            </label>
          </div>
        ))}
        <button type="submit" className="btn btn-primary me-2">Vote</button>
        <button
          type="reset"
          className="btn btn-secondary"
          onClick={() => setSelectedPie("")}
        >
          Reset
        </button>
      </form>
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span><br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
