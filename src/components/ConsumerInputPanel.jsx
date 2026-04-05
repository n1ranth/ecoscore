import { useState } from "react";
import "../styles/ConsumerInputPanel.css";

const ConsumerInputPanel = ({ foundProducts, setFoundProducts }) => {
  const [productName, setProductName] = useState("");

  // Add product immediately without API delay
  const handleAddProduct = () => {
    if (!productName.trim()) return;

    // Add product to found products list
    const newProduct = {
      id: Date.now(),
      name: productName,
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      carbon: (Math.random() * 20 + 5).toFixed(2), // Random carbon between 5-25
      verdict: Math.random() > 0.3 ? "SUSTAINABLE" : "MODERATE"
    };
    
    setFoundProducts(prev => [...prev, newProduct]);
    
    // Clear input
    setProductName("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddProduct();
    }
  };

  const handleRemoveProduct = (productId) => {
    setFoundProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <div className="consumer-input-panel">
      <div className="input-group">
        <label className="label highlight">ADD_PRODUCTS</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter product name..."
          className="product-input"
        />
        <button 
          onClick={handleAddProduct}
          disabled={!productName.trim()}
          className="add-button"
        >
          ADD
        </button>
      </div>

      {/* Display added products immediately below add bar */}
      {foundProducts.length > 0 && (
        <div className="added-products">
          <h4 className="added-products-title">ADDED_PRODUCTS</h4>
          <div className="products-list">
            {foundProducts.map((product) => (
              <div key={product.id} className="added-product-item">
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-score">Score: {product.score}</div>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="system-note">
        <p className="small-text">// DATA_INPUT_DEPENDENCY: ACTIVE</p>
      </div>
    </div>
  );
};

export default ConsumerInputPanel;
