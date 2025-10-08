import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">Home</Link>
      <Link style={styles.link} to="/play">Play</Link>
      <Link style={styles.link} to="/scores">Scores</Link>
      <Link style={styles.link} to="/about">About</Link>
    </nav>
  );
}
const styles = {
  nav: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    borderBottom: "2px solid #ccc",
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
  },
};