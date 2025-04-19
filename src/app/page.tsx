import Link from "next/link";
import "./page.scss"; // Import the SCSS file for page-specific styles

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-overlay">
        <h1 className="home-title">Welcome to the Fun Zone!</h1>
        <p className="home-subtitle">Learn and play with us!</p>
        <div className="start-button-container">
        <Link href="/game?levelNum=1" className="start-button one">
          Start Game - Level 1
        </Link>
        <Link href="/game?levelNum=2" className="start-button two">
          Start Game - Level 2
        </Link>
        </div>
      </div>
    </div>
  );
}
