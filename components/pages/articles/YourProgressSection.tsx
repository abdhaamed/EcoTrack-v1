export default function YourProgressSection() {
  return (
    <div className="progress-section">
      <div className="section-header">
        <h3 className="section-title">Your Progress</h3>
        <button className="edit-btn">✏️</button>
      </div>

      <div className="progress-item">
        <span className="progress-label">Articles Read</span>
        <span className="progress-value">12</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: "60%" }}></div>
      </div>

      <div className="progress-stat">
        <span className="progress-text">85% Quiz Accuracy</span>
      </div>

      <div className="badge-earned">
        <span className="badge-icon">🏆</span>
        <span className="badge-text">Badge Earned</span>
      </div>
    </div>
  );
}
