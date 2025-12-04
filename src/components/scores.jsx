import React, { useEffect, useState, useRef } from "react";

export default function Scores() {
  const [votes, setVotes] = useState({});
  const ws = useRef(null);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("/api/votes");
        const data = await res.json();
        setVotes(data);
      } catch (err) {
        console.error("Failed to fetch votes:", err);
      }
    };
    fetchVotes();
    ws.current = new WebSocket(`ws://${window.location.host}/ws`);
    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "votes") setVotes(message.data);
    };
    return () => ws.current.close();
  }, []);

  return (
    <main className="container text-center">
      <h1 className="mb-3">Pie Voting Results</h1>
      <table className="table table-striped table-bordered mx-auto" style={{ maxWidth: "400px" }}>
        <thead className="table-dark">
          <tr>
            <th>Flavor</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {["apple", "pumpkin", "cherry", "peach"].map((pie) => (
            <tr key={pie}>
              <td>{pie[0].toUpperCase() + pie.slice(1)}</td>
              <td>{votes[pie] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="text-center mt-5 py-3 border-top">
        <span>Created by Jeremiah Barton</span><br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
