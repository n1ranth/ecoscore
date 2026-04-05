import { useState } from "react";
import "../styles/AlternativesPanel.css";

const AlternativesPanel = ({ foundProducts, setFoundProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogAction, setDialogAction] = useState(null);

  // Mock alternatives data - replace with actual API
  const getAlternatives = (productName) => {
    const alternativesDB = {
      "iPhone": [
        { name: "Fairphone 5", carbonChange: -8.5, score: 92 },
        { name: "Google Pixel 8a", carbonChange: -5.2, score: 88 },
        { name: "Samsung Galaxy S24", carbonChange: -3.1, score: 85 }
      ],
      "Nike": [
        { name: "Allbirds Tree Runners", carbonChange: -6.8, score: 90 },
        { name: "Veja Campo Sneakers", carbonChange: -4.3, score: 86 },
        { name: "Adidas Stan Smith", carbonChange: -2.1, score: 82 }
      ],
      "Dell": [
        { name: "Lenovo ThinkPad", carbonChange: -7.2, score: 91 },
        { name: "HP EliteBook", carbonChange: -4.8, score: 87 },
        { name: "MacBook Air M2", carbonChange: -6.1, score: 89 }
      ]
    };

    // Find matching alternatives
    for (const [key, alternatives] of Object.entries(alternativesDB)) {
      if (productName.toLowerCase().includes(key.toLowerCase())) {
        return alternatives;
      }
    }
    
    // Default alternatives if no match
    return [
      { name: "Eco Alternative A", carbonChange: -5.0, score: 85 },
      { name: "Eco Alternative B", carbonChange: -3.5, score: 82 }
    ];
  };

  const handleAddAlternative = (alternative, action) => {
    setSelectedProduct(alternative);
    setShowDialog(true);
  };

  const confirmAddAlternative = (action) => {
    const newProduct = {
      id: Date.now(),
      name: selectedProduct.name,
      score: selectedProduct.score,
      carbon: (Math.random() * 20 + 5).toFixed(2),
      verdict: selectedProduct.score > 85 ? "SUSTAINABLE" : "MODERATE"
    };

    if (action === 'replace' && foundProducts.length > 0) {
      // Replace the last product
      setFoundProducts(prev => [...prev.slice(0, -1), newProduct]);
    } else {
      // Add separately
      setFoundProducts(prev => [...prev, newProduct]);
    }

    setShowDialog(false);
    setSelectedProduct(null);
    setDialogAction(null);
  };

  const alternatives = foundProducts.length > 0 
    ? getAlternatives(foundProducts[foundProducts.length - 1].name)
    : [];

  return (
    <div className="alternatives-panel">
      <h2 className="panel-title">BETTER_ALTERNATIVES</h2>
      
      {foundProducts.length === 0 ? (
        <div className="no-products">
          <p className="info-text">Add products to see alternatives</p>
        </div>
      ) : (
        <div className="alternatives-list">
          {alternatives.map((alternative, index) => (
            <div key={index} className="alternative-item">
              <div className="alternative-info">
                <div className="alternative-name">{alternative.name}</div>
                <div className="alternative-stats">
                  <span className="score-badge">Score: {alternative.score}</span>
                  <span className={`carbon-change ${alternative.carbonChange < 0 ? 'negative' : 'positive'}`}>
                    {alternative.carbonChange < 0 ? '' : '+'}{alternative.carbonChange} kg CO2
                  </span>
                </div>
              </div>
              <button 
                className="add-alternative-btn"
                onClick={() => handleAddAlternative(alternative)}
              >
                +
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Replace/Add Dialog */}
      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3 className="dialog-title">Add Alternative</h3>
            <p className="dialog-message">
              Do you want to add "{selectedProduct?.name}" separately or replace the last item?
            </p>
            <div className="dialog-buttons">
              <button 
                className="dialog-btn replace-btn"
                onClick={() => confirmAddAlternative('replace')}
              >
                REPLACE
              </button>
              <button 
                className="dialog-btn add-btn"
                onClick={() => confirmAddAlternative('add')}
              >
                ADD SEPARATELY
              </button>
              <button 
                className="dialog-btn cancel-btn"
                onClick={() => setShowDialog(false)}
              >
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlternativesPanel;
