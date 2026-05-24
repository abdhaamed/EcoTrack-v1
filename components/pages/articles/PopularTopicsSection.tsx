const topics = [
  {
    id: 1,
    name: "Biodiversity",
    articles: "24 articles",
  },
  {
    id: 2,
    name: "Microplastic Research",
    articles: "18 articles",
  },
  {
    id: 3,
    name: "Zero-waste Cooking",
    articles: "12 articles",
  },
  {
    id: 4,
    name: "Carbon Footprint Calc",
    articles: "15 articles",
  },
];

export default function PopularTopicsSection() {
  return (
    <div className="popular-topics-section">
      <div className="section-header">
        <h3 className="section-title">Popular Topics</h3>
      </div>

      <div className="topics-list">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-item">
            <span className="topic-bullet">•</span>
            <div className="topic-info">
              <p className="topic-name">{topic.name}</p>
              <p className="topic-count">{topic.articles}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="view-all-topics-btn">View All Topics</button>
    </div>
  );
}
