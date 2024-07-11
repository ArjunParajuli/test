import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';
import ProductList from './ProductList';
import Filter from './Filter';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ company: 'AMZ', category: 'Laptop', top: 10, minPrice: 1, maxPrice: 1000 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(filters.company, filters.category, filters.top, filters.minPrice, filters.maxPrice);
        setProducts(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [filters]);

  return (
    <div>
      <Filter setFilters={setFilters} />
      <ProductList products={products} />
    </div>
  );
};

export default Home;
