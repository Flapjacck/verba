import { useEffect, useState } from "react";

interface QuoteDisplayProps {
  quote: string;
  author: string;
}

/**
 * Displays the quote of the day
 * @param quote - The quote text to display
 * @param author - The author of the quote
 */
export const QuoteDisplay = ({ quote, author }: QuoteDisplayProps) => {
  // State to control the visibility of elements for animation
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30);

    return () => clearTimeout(timer);
  }, [quote]); // Re-trigger animation when quote changes

  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto h-[80vh] px-4">
      {/* Quote container */}
      <div
        className={`bg-white bg-opacity-70 rounded-lg p-8 shadow-lg transition-all duration-1000 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* Opening quote mark */}
        <div className="text-5xl text-verba-green opacity-50 mb-2">"</div>

        {/* Quote text */}
        <p className="text-xl md:text-2xl font-caudex italic mb-6 text-center">
          {quote}
        </p>

        {/* Closing quote mark */}
        <div className="text-5xl text-verba-green opacity-50 text-right">"</div>

        {/* Author name */}
        {author && (
          <p
            className={`text-right text-lg md:text-xl font-caudex-bold transition-opacity duration-1000 delay-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            — {author}
          </p>
        )}
      </div>
    </div>
  );
};
