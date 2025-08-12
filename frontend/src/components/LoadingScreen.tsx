import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [text, setText] = useState("");
  const [isFading, setIsFading] = useState(false);
  const fullText = "verba";

  useEffect(() => {
    // Add the class to html element to prevent scrolling during loading
    document.documentElement.classList.add("loading-active");

    return () => {
      // Remove the class when component unmounts
      document.documentElement.classList.remove("loading-active");
    };
  }, []);

  useEffect(() => {
    let index = 0;
    // typing speed (250ms between characters)
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;

      if (index > fullText.length) {
        clearInterval(interval);

        // 2.5s fade
        setTimeout(() => {
          setIsFading(true);
          // Wait for the fade animation to complete before triggering onComplete
          setTimeout(() => {
            onComplete();
          }, 1500);
        }, 1700);
      }
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center loading-bg ${
        isFading ? "loading-fade-out" : ""
      }`}
    >
      <div
        className={`mb-4 text-5xl font-caudex italic font-bold text-center text-verba-green ${
          isFading ? "text-fade-out" : ""
        }`}
      >
        {text}
      </div>
    </div>
  );
};
