import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Fun Zone!</h1>
      <p style={styles.subtitle}>Learn and play with us!</p>
      <Link href="/game">
        <a style={styles.button}>🎮 Go to Game Page</a>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#FFFAE5",
    textAlign: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "#FF6F61",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#4CAF50",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    marginBottom: "20px",
  },
  button: {
    fontSize: "1.5rem",
    color: "#FFFFFF",
    backgroundColor: "#FF6F61",
    padding: "10px 20px",
    borderRadius: "10px",
    textDecoration: "none",
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s",
  },
  buttonHover: {
    transform: "scale(1.1)",
  },
};
