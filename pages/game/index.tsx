import React, { useState } from "react";
import Keyboard from "../../components/Keyboard";

const Home: React.FC = () => {
  const [input, setInput] = useState("");
  const sinhalaLetters = ["අ", "ආ", "ඇ", "ඈ", "ඉ", "ඊ", "උ", "ඌ", "එ", "ඒ"];

  const handleKeyPress = (letter: string) => {
    setInput((prev) => prev + letter);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sinhala Keyboard</h1>
      <input
        type="text"
        value={input}
        readOnly
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "18px",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <Keyboard letters={sinhalaLetters} onKeyPress={handleKeyPress} />
    </div>
  );
};

export default Home;
