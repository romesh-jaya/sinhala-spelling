"use client";

import React from "react";
import Game from "../../../components/Game/Game";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./page.scss";

export default function GamePage() {
  return (
    <div className="game-page">
      <Game />
    </div>
  )
}