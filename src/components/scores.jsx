import { useState, useEffect, useRef } from "react";

export default function Scores() {
  const [votes, setVotes] = useState({ apple: 0, pumpkin: 0, cherry: 0, peach: 0 });
  const ws = useRef(null);

  useEffect(() => {
    async function fetchVotes() {
      try {
        const res = await fetch("/api/votes");
        if (!res.ok) throw new Error("Failed to fetch votes");
        const data = await res.json();
        setVotes(data);
      } catch (err) {
        console.error("Error fetching votes:", err);
      }
    }
    fetchVotes();
    ws.current = new WebSocket(`${window.location.protocol === "https:" ? "wss" : "ws"}://${window.location.host}/ws`);
    ws.current.onopen = () => console.log("WebSocket connected");
    ws.current.onclose = () => console.log("WebSocket disconnected");
    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        if (message.type === "votes") setVotes(message.data);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
    return () => {
      if (ws.current) ws.current.close();
    };
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
        <span>Created by Jeremiah Barton</span>
        <br />
        <a href="https://github.com/jeremiahu2/startup">GitHub</a>
      </footer>
    </main>
  );
}
