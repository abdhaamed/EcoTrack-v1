"use client";

import { useState } from "react";

const categories = [
  "All Topics",
  "Environment",
  "Recycling",
  "Community",
  "Clean Energy",
];

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("All Topics");

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-btn ${activeCategory === category ? "active" : ""}`}
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
