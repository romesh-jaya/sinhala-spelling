import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container as React.CSSProperties}>
      <div style={styles.overlay as React.CSSProperties}>
        <h1 style={styles.title}>Welcome to the Fun Zone!</h1>
        <p style={styles.subtitle}>Learn and play with us!</p>
        <Link href="/game" style={styles.button}>
          Start Game
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: "url('/images/kids-hero.jpg')", // Replace with your image path
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent overlay
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
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
};
