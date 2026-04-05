import "../styles/Score.css";

const ScoreHUD = ({ data, foundProducts = [], mode = "business" }) => {
  // data = { carbon: "12.50", score: 85, verdict: "SUSTAINABLE" }

  const getVerdictColor = (verdict) => {
    if (verdict === "SUSTAINABLE") return "#00ff88"; // Neon Green
    if (verdict === "MODERATE") return "#f2ff00";    // Neon Yellow
    return "#ff0055";                                // Neon Red
  };

  return (
    <div className="score-hud-container">
      <div className="main-score-circle">
        <span className="label">ECO_SCORE</span>
        <h1 className="score-value" style={{ color: getVerdictColor(data.verdict) }}>
          {data.score}
        </h1>
      </div>

      <div className="stats-row">
        <div className="stat-item">
          <span className="label">CARBON_FOOTPRINT</span>
          <p className="value highlight">{data.carbon} <small>kg/CO2</small></p> [cite: 26]
        </div>
        <div className="stat-item">
          <span className="label">VERDICT</span>
          <p className="value" style={{ color: getVerdictColor(data.verdict) }}>
            {data.verdict}
          </p> [cite: 28-29]
        </div>
      </div>

      {/* Display found products in consumer mode */}
      {mode === "consumer" && foundProducts.length > 0 && (
        <div className="found-products">
          <h3 className="products-title">EVALUATED_PRODUCTS</h3>
          <div className="products-list">
            {foundProducts.map((product) => (
              <div key={product.id} className="product-item">
                <div className="product-name">{product.name}</div>
                <div className="product-stats">
                  <span className="product-score" style={{ color: getVerdictColor(product.verdict) }}>
                    SCORE: {product.score}
                  </span>
                  <span className="product-carbon">
                    {product.carbon} kg/CO2
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreHUD;
