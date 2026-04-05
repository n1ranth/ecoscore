import { useState } from "react";
import InputPanel from "./components/InputPanel";
import ConsumerInputPanel from "./components/ConsumerInputPanel";
import Score from "./components/Score";
import Simulator from "./components/Simulator";
import AlternativesPanel from "./components/AlternativesPanel";
import { calculateEcoScore } from "./utils/calcEngine";
import "./styles/App.css";

function App() {
  const [mode, setMode] = useState("consumer"); // "business" or "consumer"
  const [inputs, setInputs] = useState({
    categoryVal: 10,
    materialVal: 15,
    transportVal: 20,
    packagingVal: 10,
  });
  const [baselineCarbon, setBaselineCarbon] = useState(null);
  const [foundProducts, setFoundProducts] = useState([]);
  const results = calculateEcoScore(inputs);

  if (baselineCarbon == null) setBaselineCarbon(results.carbon);

  return (
    <div className="dashboard-container">
      <header className="hud-header">
        <h1 className="highlight">ECOSCORE // SUSTAINABILITY_TRACKER</h1>
        <div className="mode-tabs">
          <button 
            className={`mode-tab ${mode === "consumer" ? "active" : ""}`}
            onClick={() => setMode("consumer")}
          >
            CONSUMER
          </button>
          <button 
            className={`mode-tab ${mode === "business" ? "active" : ""}`}
            onClick={() => setMode("business")}
          >
            BUSINESS
          </button>
        </div>
        <div className="status">SYSTEM_READY</div>
      </header>

      <main className="hud-grid">
        <section className="glass-card">
          {mode === "business" ? (
            <InputPanel inputs={inputs} setInputs={setInputs} />
          ) : (
            <ConsumerInputPanel 
              foundProducts={foundProducts} 
              setFoundProducts={setFoundProducts}
            />
          )}
        </section>

        <section className="glass-card main-display">
          <Score data={results} foundProducts={foundProducts} mode={mode} />
        </section>

        <section className="glass-card">
          {mode === "business" ? (
            <Simulator currentResults={results} baselineCarbon={baselineCarbon} />
          ) : (
            <AlternativesPanel 
              foundProducts={foundProducts} 
              setFoundProducts={setFoundProducts}
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
