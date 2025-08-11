/** fetch the qotd */

interface QuoteData {
  quote: string;
  author: string;
}

/**
 * Fetches quote of the day from ZenQuotes API
 * @returns Promise containing quote and author
 */
export const fetchQuoteOfTheDay = async (): Promise<QuoteData> => {
  try {
    // Use CORS proxy to make the API call work
    const response = await fetch('https://corsproxy.io/?https%3A%2F%2Fzenquotes.io%2Fapi%2Ftoday');
    const data = await response.json();
    
    // If retrieved Ok return data
    return {
      quote: data[0].q,
      author: data[0].a
    };
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
