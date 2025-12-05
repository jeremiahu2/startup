import { Link } from "react-router-dom";

export default function NavBar({ loggedIn }) {
  return (
    <nav style={styles.nav}>
      <Link style={styles.link} to="/">Home</Link>
      {loggedIn && <Link style={styles.link} to="/play">Play</Link>}
      {loggedIn && <Link style={styles.link} to="/scores">Scores</Link>}
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
    gap: "25px",
    borderBottom: "2px solid #ccc",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  link: {
    textDecoration: "none",
    color: "#333",
    fontWeight: "bold",
    transition: "color 0.3s ease, transform 0.2s ease",
  },
};
