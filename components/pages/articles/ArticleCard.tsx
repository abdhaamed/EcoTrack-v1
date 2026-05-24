/* eslint-disable @next/next/no-img-element */

interface ArticleCardProps {
  id: number;
  image: string;
  category: string;
  title: string;
  description: string;
  readTime: string;
}

export default function ArticleCard({
  image,
  category,
  title,
  description,
  readTime,
}: ArticleCardProps) {
  return (
    <article className="article-card">
      <div className="article-card-image">
        <img src={image} alt={title} />
      </div>
      <div className="article-card-body">
        <div className="article-meta">
          <span className="article-category">{category}</span>
          <span className="article-separator">•</span>
          <span className="article-read-time">{readTime} read</span>
        </div>
        <h3 className="article-card-title">{title}</h3>
        <p className="article-card-description">{description}</p>
        <button className="article-read-btn">Read +</button>
      </div>
    </article>
  );
}
