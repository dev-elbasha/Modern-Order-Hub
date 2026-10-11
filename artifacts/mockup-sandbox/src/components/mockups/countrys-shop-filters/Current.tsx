import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import "./_group.css";

const categories = ["Nut butters", "Spreads", "Sauces", "Savory", "Snacks"];

export function Current() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("name");
  const options = [
    ["all", "All products"],
    ...categories.map((name) => [name, name]),
  ];

  return (
    <main className="filter-preview-shell dark">
      <div className="shop-toolbar">
        <div className="search-field">
          <Search size={18} aria-hidden="true" />
          <input
            aria-label="Search products"
            placeholder="Search product names..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <select
          className="select"
          aria-label="Filter by category"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        >
          {options.map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <select
          className="select"
          aria-label="Sort products"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
        >
          <option value="name">Name A–Z</option>
          <option value="category">Category A–Z</option>
        </select>
      </div>
      <div className="filters">
        <SlidersHorizontal size={17} aria-hidden="true" />
        {options.map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`filter-chip ${filter === key ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>
    </main>
  );
}
