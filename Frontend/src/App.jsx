import React, { useEffect, useState } from "react";
import axios from 'axios';
import './index.css';

const App = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products/")
      .then((response) => {
        // Make sure to match your API's response structure
        setProduct(response.data.product);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("Could not load product.");
      });
  }, []);

  const handleBuyNow = () => {
    alert("Item added to cart!");
  };

  const formatPrice = (amount, currency = "USD") => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  // FIX: This check prevents the "reading properties of null" error
  if (!product && !error) {
    return <div className="app-shell">Loading product details...</div>;
  }

  // Now it is safe to destructure
  const { image, title, description, price } = product || {};

  return (
    <div className="app-shell">
      {product && (
        <div className="card">
          <div className="media">
            <img src={image} alt={title} />
          </div>
          <div className="content">
            <h1 className="title">{title}</h1>
            <p className="description">{description}</p>
            <div className="row">
              <div className="price">
                {formatPrice((price?.amount / 100) ?? 0, price?.currency)}
              </div>
              <button className="btn" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}

      {error && <div className="note">{error}</div>}
    </div>
  );
};

export default App;