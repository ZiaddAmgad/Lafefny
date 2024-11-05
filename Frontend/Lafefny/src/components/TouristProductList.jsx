/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import '../styles/productList.css';
import { fetchExchangeRates } from '../services/currencyService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [selectedReviews, setSelectedReviews] = useState([]);
  const [currency, setCurrency] = useState('EGP');
  const [conversionRates, setConversionRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [ratesError, setRatesError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const getRates = async () => {
      try {
        const rates = await fetchExchangeRates();
        setConversionRates(rates);
      } catch (error) {
        setRatesError('Failed to load currency rates');
      } finally {
        setRatesLoading(false);
      }
    };
    getRates();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const convertPrice = (price) => {
    if (!conversionRates || !price) return price;
    // Convert from EGP to USD first
    const priceInUSD = price / conversionRates.EGP;
    // Then convert to target currency
    return (priceInUSD * conversionRates[currency]).toFixed(2);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const openModal = (reviews) => {
    setSelectedReviews(reviews);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedReviews([]);
  };

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.seller.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => {
      if (filterType === 'price' && filterValue) {
        return product.price <= parseFloat(filterValue);
      }
      if (filterType === 'quantity' && filterValue) {
        return product.quantity >= parseInt(filterValue);
      }
      if (filterType === 'rating' && filterValue) {
        return product.ratings.averageRating >= parseFloat(filterValue);
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.ratings.averageRating - a.ratings.averageRating;
      return 0;
    });

  return (
    <div className="product-list-container">
      <h1>Product List</h1>
      <div className="controls">
        {ratesLoading ? (
          <p>Loading currencies...</p>
        ) : ratesError ? (
          <p>Error loading currencies</p>
        ) : (
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)}
            className="currency-select"
          >
            {Object.keys(conversionRates).map(code => (
              <option key={code} value={code}>{code}</option>
            ))}
          </select>
        )}
        <input
          type="text"
          placeholder="Search by name, description, or seller..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Filter</option>
          <option value="price">Filter by Max Price</option>
          <option value="quantity">Filter by Min Quantity</option>
          <option value="rating">Filter by Min Rating</option>
        </select>
        {filterType && (
          <input
            type={filterType === 'quantity' ? 'number' : 'text'}
            placeholder={`Enter ${filterType} value`}
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            className="filter-input"
          />
        )}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Average Rating</th>
            <th>Description</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td><img src={product.imageUrl} alt={product.name} width="100" /></td>
              <td>{!ratesLoading && convertPrice(product.price)} {currency}</td>
              <td>{product.quantity}</td>
              <td>{product.ratings.averageRating.toFixed(1)} ★ ({product.ratings.totalRatings})</td>
              <td>{product.description}</td>
              <td>{product.seller}</td>
              <td>
                <button onClick={() => openModal(product.ratings.reviews)}>View Reviews</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Reviews</h2>
            {selectedReviews.length > 0 ? (
              <ul>
                {selectedReviews.map((review, index) => (
                  <li key={index}>
                    <strong>Reviewer:</strong> {review.reviewerName} <br />
                    <strong>Rating:</strong> {review.rating.toFixed(1)} ★ <br />
                    <strong>Comment:</strong> {review.comment} <br />
                    <strong>Date:</strong> {formatDate(review.date)}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;