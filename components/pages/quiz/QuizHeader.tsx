"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface QuizHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
}

export default function QuizHeader({
  currentQuestion,
  totalQuestions,
}: QuizHeaderProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = (currentQuestion / totalQuestions) * 100;

  const handleGiveUp = () => {
    router.push("/articles");
  };

  return (
    <div className="quiz-header">
      <h1 className="quiz-title">Kuis: Restorasi Ekosistem</h1>

      <div className="quiz-header-content">
        <div className="quiz-progress-section">
          <div className="progress-info">
            <span className="progress-label">Progress</span>
            <span className="progress-text">
              {currentQuestion} / {totalQuestions}
            </span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="quiz-timer-section">
          <div className="timer-icon">⏱️</div>
          <div className="timer-content">
            <div className="timer-label">WAKTU TERSISA</div>
            <div className="timer-display">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </div>
          </div>
          <button className="giveup-btn" onClick={handleGiveUp}>
            MENYERAH
          </button>
        </div>
      </div>
    </div>
  );
}
