import React, { useState } from 'react';

const Filter = ({ setFilters }) => {
  const [company, setCompany] = useState('AMZ');
  const [category, setCategory] = useState('Laptop');
  const [top, setTop] = useState(10);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({ company, category, top, minPrice, maxPrice });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Company:
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
      </label>
      <label>
        Top N:
        <input type="number" value={top} onChange={(e) => setTop(e.target.value)} />
      </label>
      <label>
        Min Price:
        <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </label>
      <label>
        Max Price:
        <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </label>
      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default Filter;
