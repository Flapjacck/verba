import { useState, useEffect } from "react";
import { fetchQuoteOfTheDay } from "./services/qotd.ts";
import { fetchRandomQuote } from "./services/random.ts";
import { LoadingScreen } from "./components/LoadingScreen";
import { QuoteDisplay } from "./components/QuoteDisplay";
import { VerbaV } from "./components/VerbaV";
import { Button } from "./components/Button";

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

  // Function to fetch random quote
  const handleFetchRandomQuote = async () => {
    const data = await fetchRandomQuote();
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
          <>
            <QuoteDisplay quote={quoteData.quote} author={quoteData.author} />
            <div className="flex justify-center">
              <Button
                onClick={handleFetchRandomQuote}
                text="Generate Random Quote"
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
