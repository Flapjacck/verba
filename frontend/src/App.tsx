import { useState } from "react";
import { fetchQuoteOfTheDay } from "./services/qotd.ts";

function App() {
  // State for quote data
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });

  // Function to call the qotd
  const handleFetchQuote = async () => {
    const data = await fetchQuoteOfTheDay();
    setQuoteData(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Button to fetch quote */}
      <button onClick={handleFetchQuote}>Get Quote of the Day</button>

      {/* Display quote and author */}
      {quoteData.quote && (
        <div style={{ marginTop: "20px" }}>
          <p>"{quoteData.quote}"</p>
          {quoteData.author && <p>- {quoteData.author}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
