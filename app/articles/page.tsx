import {
  FeaturedArticleCard,
  CategoryFilter,
  ArticleGrid,
  DailyQuizBox,
  YourProgressSection,
  PopularTopicsSection,
} from "@/components/pages/articles";

export default function ArticlesPage() {
  return (
    <>
      <div className="articles-content">
        {/* Featured Article */}
        <FeaturedArticleCard />

        {/* Main Content Grid */}
        <div className="articles-main-grid">
          {/* Left: Articles */}
          <div className="articles-left-section">
            {/* Category Filter */}
            <CategoryFilter />

            {/* Article Grid */}
            <ArticleGrid />
          </div>

          {/* Right: Sidebar */}
          <div className="articles-right-sidebar">
            {/* Daily Quiz */}
            <DailyQuizBox />

            {/* Your Progress */}
            <YourProgressSection />

            {/* Popular Topics */}
            <PopularTopicsSection />
          </div>
        </div>
      </div>
    </>
  );
}
