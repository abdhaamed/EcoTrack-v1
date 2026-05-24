"use client";

interface QuestionOption {
  id: string;
  label: string;
  correct?: boolean;
}

interface Question {
  id: number;
  number: string;
  question: string;
  options: QuestionOption[];
}

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  onSelectAnswer: (optionId: string) => void;
}

export default function QuizQuestion({
  question,
  selectedAnswer,
  onSelectAnswer,
}: QuizQuestionProps) {
  return (
    <div className="quiz-question-card">
      <div className="question-header">
        <span className="question-number-badge">{question.number}</span>
      </div>

      <h2 className="quiz-question-text">{question.question}</h2>

      <div className="quiz-options">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.id;
          const isCorrect = option.correct;

          return (
            <button
              key={option.id}
              className={`quiz-option ${isSelected ? "selected" : ""} ${
                isSelected && isCorrect ? "correct" : ""
              }`}
              onClick={() => onSelectAnswer(option.id)}
            >
              <div className="option-label">{option.id}</div>
              <div className="option-text">{option.label}</div>
              {isSelected && isCorrect && (
                <div className="option-checkmark">✓</div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
