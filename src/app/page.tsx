import Link from "next/link";
import type { Metadata } from "next";
import "./page.scss"; // Import the SCSS file for page-specific styles

export const metadata: Metadata = {
  title: "Sinhala Spelling Game | Learn to Spell in Sinhala",
  description: "Free interactive Sinhala spelling game for kids. Master Sinhala letters and words through engaging gamified lessons.",
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "EducationalApplication",
    "name": "Sinhala Spelling Game",
    "description": "Free interactive Sinhala spelling game for kids",
    "url": "https://sinhala-spelling.web.app",
    "applicationCategory": "EducationalApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="home-container">
        <div className="home-overlay">
          <h1 className="home-title">Welcome to the Sinhala Spelling Game!</h1>
          <p className="home-subtitle">Learn and master Sinhala spelling with interactive lessons</p>
          <div className="start-button-container">
            <Link href="/game?levelNum=1" className="start-button one">
              Start Game - Level 1 (Basic Letters)
            </Link>
            <Link href="/game?levelNum=2" className="start-button two">
              Start Game - Level 2 (Intermediate)
            </Link>
            <Link href="/game?levelNum=3" className="start-button three">
              Start Game - Level 3 (Advanced)
            </Link>
          </div>
          <section className="about-section" aria-label="About this game" >
            <h2>About This Game</h2>
            <p>Learn Sinhala spelling through an interactive, gamified experience. Perfect for beginners and students of all ages who want to improve their Sinhala language skills.</p>
          </section>
        </div>
        <footer>
          <div className="footer-content">
            <a href="https://github.com/romesh-jaya" target="_blank" rel="noopener noreferrer">
              Visit My Github - romesh-jaya
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}
