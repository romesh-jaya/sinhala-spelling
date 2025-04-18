import Link from "next/link";
import "./page.scss"; // Import the SCSS file for page-specific styles

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to the Fun Zone!</h1>
        <p className="home-subtitle">Learn and play with us!</p>
        <Link href="/game" className="start-button">
          Start Game
        </Link>
      </div>
    </div>
  );
}
