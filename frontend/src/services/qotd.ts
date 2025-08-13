/** fetch the qotd */

interface QuoteData {
  quote: string;
  author: string;
}

interface CachedQuoteData extends QuoteData {
  date: string;
}

/**
 * Checks localStorage for todays cached quote
 * @returns Cached quote data or null if no valid cache
 */
const getCachedQuote = (): QuoteData | null => {
  try {
    // Get cached data from localStorage
    const cachedData = localStorage.getItem('quoteCacheData');
    
    if (cachedData) {
      const { quote, author, date } = JSON.parse(cachedData) as CachedQuoteData;
      const today = new Date().toDateString();
      
      // If cached quote is from today use that
      if (date === today) {
        return { quote, author };
      }
    }
    
    // No valid cached data
    return null;
  } catch (error) {
    console.error('Error reading from cache:', error);
    return null;
  }
};

/**
 * Fetches quote of the day from ZenQuotes API
 * @returns Promise containing quote and author
 */
export const fetchQuoteOfTheDay = async (): Promise<QuoteData> => {
  // First check for cached quote
  const cachedQuote = getCachedQuote();
  if (cachedQuote) {
    return cachedQuote;
  }
  
  try {
    // Use CORS proxy to make the API call work
    const response = await fetch('https://corsproxy.io/?https%3A%2F%2Fzenquotes.io%2Fapi%2Ftoday');
    const data = await response.json();
    
    // Create quote data object
    const quoteData = {
      quote: data[0].q,
      author: data[0].a
    };
    
    // Cache the quote with todays date
    localStorage.setItem('quoteCacheData', JSON.stringify({
      ...quoteData,
      date: new Date().toDateString()
    }));
    
    // Return quote data
    return quoteData;
  } 
  /** Handle errors */
  catch (error) {
    console.error('Error fetching quote:', error);
    return {
      quote: 'Failed to fetch quote',
      author: ''
    };
  }
};
