import React from "react";
import { Button } from "react-bootstrap";

const CategoryTabs = ({ categories, selectedCategory, setSelectedCategory }) => (
  <div className="mb-4 d-flex gap-2 flex-wrap">
    {categories.map((cat) => (
      <Button
        key={cat}
        variant={selectedCategory === cat ? "primary" : "outline-primary"}
        onClick={() => setSelectedCategory(cat)}
      >
        {cat}
      </Button>
    ))}
  </div>
);

export default CategoryTabs;
