/* eslint-disable @next/next/no-img-element */

export default function FeaturedArticleCard() {
  return (
    <div className="featured-article-card">
      <div className="featured-article-content">
        <span className="featured-label">FEATURED ARTICLE</span>
        <h1 className="featured-title">Hutan Kota: Paru-paru yang Perlu Kita Rawat Bersama</h1>
        <p className="featured-description">
          Discover how modern architecture is integrating biodiversity into city centers to combat heat islands and restore local ecosystems.
        </p>
        <div className="featured-actions">
          <button className="btn-primary">Read Article</button>
          <button className="btn-secondary">Save for Later</button>
        </div>
      </div>
      <div className="featured-article-image">
        <img src="/images/dashboard/article-urban.png" alt="Urban Forests" />
      </div>
    </div>
  );
}
