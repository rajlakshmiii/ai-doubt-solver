"use client";


import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: linear-gradient(135deg, #f0f4ff 0%, #faf0ff 100%);
    min-height: 100vh;
  }

  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
  }

  .card {
    background: #ffffff;
    border-radius: 24px;
    padding: 48px 40px;
    width: 100%;
    max-width: 580px;
    box-shadow: 0 20px 60px rgba(100, 80, 200, 0.12), 0 4px 16px rgba(0,0,0,0.06);
    text-align: center;
  }

  .icon {
    font-size: 2.5rem;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 8px;
  }

  .subtitle {
    font-size: 14px;
    color: #888;
    font-weight: 300;
    margin-bottom: 36px;
  }

  .input-row {
    display: flex;
    align-items: center;
    background: #f5f5ff;
    border: 2px solid #e0d9ff;
    border-radius: 100px;
    padding: 6px 6px 6px 20px;
    margin-bottom: 28px;
    transition: border-color 0.25s, box-shadow 0.25s;
  }

  .input-row:focus-within {
    border-color: #7c6ff7;
    box-shadow: 0 0 0 4px rgba(124, 111, 247, 0.12);
  }

  .input-row input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    color: #333;
  }

  .input-row input::placeholder { color: #aaa; }

  .ask-btn {
    background: linear-gradient(135deg, #7c6ff7, #a78bfa);
    color: #fff;
    border: none;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    font-weight: 500;
    padding: 11px 26px;
    border-radius: 100px;
    transition: transform 0.2s, box-shadow 0.2s;
    white-space: nowrap;
  }

  .ask-btn:hover {
    transform: scale(1.04);
    box-shadow: 0 6px 20px rgba(124, 111, 247, 0.4);
  }

  .ask-btn:active { transform: scale(0.97); }

  .answer-section {
    background: #f9f8ff;
    border: 1.5px solid #ede9ff;
    border-radius: 16px;
    padding: 22px 24px;
    text-align: left;
  }

  .answer-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #7c6ff7;
    margin-bottom: 10px;
  }

  .answer-text {
    font-size: 14px;
    color: #444;
    line-height: 1.75;
    font-weight: 400;
  }

  .placeholder-text {
    font-size: 14px;
    color: #bbb;
    text-align: center;
    font-weight: 300;
    font-style: italic;
  }
`;

  export default function Home() {
  const [question, setQuestion] = useState("");
const [messages, setMessages] = useState([]);

const handleAsk = async () => {
  if (!question.trim()) return;

  const userMessage = question;

  // show user message
  setMessages((prev) => [...prev, { role: "user", text: userMessage }]);

  // clear input
  setQuestion("");

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: userMessage }),
  });

  const data = await res.json();

  // show AI message
  setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
};

  return (
    <>
      <style>{styles}</style>
      <div className="container">
        <div className="card">
          <div className="icon">🤖</div>
          <h1>AI Doubt Solver</h1>
          <p className="subtitle">Ask anything and get instant answers</p>

          <div className="input-row">
            <input
              type="text"
              placeholder="Ask your doubt..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button className="ask-btn" onClick={handleAsk}>
              Ask
            </button>

          </div>

         <div className="answer-section">
  {messages.length === 0 ? (
    <p className="placeholder-text">AI response will appear here...</p>
  ) : (
    messages.map((msg, i) => (
      <p
        key={i}
        className="answer-text message"
        style={{
          textAlign: msg.role === "user" ? "right" : "left",
          marginBottom: "10px"
        }}
      >
        {msg.text}
      </p>
    ))
  )}
</div>
        </div>
      </div>
    </>
  );
}