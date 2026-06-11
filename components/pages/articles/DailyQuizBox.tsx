export default function DailyQuizBox() {
  return (
    <div className="daily-quiz-box">
      <div className="quiz-header">
        <div className="quiz-icon">🎯</div>
        <h3 className="quiz-title">Daily Quiz</h3>
      </div>

      <p className="quiz-description">
        Test your knowledge on waste, recycling and environmental topics.
      </p>

      <div className="quiz-meta">
        <div className="quiz-meta-item">
          <span className="meta-label">Today&apos;s Progress</span>
          <span className="meta-value">0/3 Questions</span>
        </div>
      </div>

      <button className="btn-continue-quiz">
    <a href="/articles/quiz">Continue Quiz</a>
  </button>

      <div className="quiz-streak">
        <div className="streak-item">
          <span className="streak-label">Articles Read</span>
          <span className="streak-value">12</span>
        </div>
        <div className="streak-item">
          <span className="streak-label">Quiz Accuracy</span>
          <span className="streak-value">85%</span>
        </div>
      </div>
    </div>
  );
}
