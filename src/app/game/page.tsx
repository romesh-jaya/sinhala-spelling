"use client";

import React from "react";
import GameWithSearchParams from "../../../components/Game/GameWithSearchParams";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./page.scss";

export default function GamePage() {
  return (
    <div className="game-page">
      <GameWithSearchParams />
    </div>
  )
}