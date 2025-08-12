import { useState, useEffect } from "react";
import { fetchQuoteOfTheDay } from "./services/qotd.ts";
import { LoadingScreen } from "./components/LoadingScreen";
import { QuoteDisplay } from "./components/QuoteDisplay";
import { VerbaV } from "./components/VerbaV";

function App() {
  // State for loading screen
  const [isLoaded, setIsLoaded] = useState(false);

  // State for quote data
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });

  // Function to call the qotd
  const handleFetchQuote = async () => {
    const data = await fetchQuoteOfTheDay();
    setQuoteData(data);
  };

  // Fetch quote automatically when component mounts
  useEffect(() => {
    if (isLoaded && !quoteData.quote) {
      handleFetchQuote();
    }
  }, [isLoaded]);

  return (
    <>
      {/* Loading screen shown until isLoaded becomes true */}
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}

      {/* logo in the top left */}
      <VerbaV />

      {/* Main app content with fade in transition */}
      <div
        className={`transition-opacity duration-1000 h-full ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Display quote and author using QuoteDisplay component */}
        {quoteData.quote && (
          <QuoteDisplay quote={quoteData.quote} author={quoteData.author} />
        )}
      </div>
    </>
  );
}

export default App;
