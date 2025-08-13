/** fetch a random quote */

interface QuoteData {
  quote: string;
  author: string;
}

/**
 * Fetches a random quote
 * @returns Promise containing quote and author
 */
export const fetchRandomQuote = async (): Promise<QuoteData> => {
  try {
    // Use CORS proxy to make the API call work
    const response = await fetch('https://corsproxy.io/?https%3A%2F%2Fzenquotes.io%2Fapi%2Frandom');
    const data = await response.json();
    
    // Create quote data object
    const quoteData = {
      quote: data[0].q,
      author: data[0].a
    };
    
    // Return quote data
    return quoteData;
  } 
  /** Handle errors */
  catch (error) {
    console.error('Error fetching random quote:', error);
    return {
      quote: 'Failed to fetch quote',
      author: ''
    };
  }
};
