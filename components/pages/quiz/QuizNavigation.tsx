"use client";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  isAnswerSelected: boolean;
  allQuestionsAnswered: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  isAnswerSelected,
  allQuestionsAnswered,
  onPrevious,
  onNext,
  onSubmit,
}: QuizNavigationProps) {
  const canGoPrevious = currentQuestion > 0;
  const isLastQuestion = currentQuestion === totalQuestions - 1;

  return (
    <div className="quiz-navigation">
      <button
        className={`quiz-nav-btn prev-btn ${!canGoPrevious ? "disabled" : ""}`}
        onClick={onPrevious}
        disabled={!canGoPrevious}
      >
        ← Sebelumnya
      </button>

      <button
        className={`quiz-nav-btn submit-btn ${!allQuestionsAnswered ? "disabled" : ""}`}
        onClick={onSubmit}
        disabled={!allQuestionsAnswered}
      >
        Kirim Jawaban
      </button>

      {!isLastQuestion && (
        <button
          className={`quiz-nav-btn next-btn ${!isAnswerSelected ? "disabled" : ""}`}
          onClick={onNext}
          disabled={!isAnswerSelected}
        >
          Selanjutnya →
        </button>
      )}
    </div>
  );
}
