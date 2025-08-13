interface ButtonProps {
  onClick: () => void;
  text: string;
}

/**
 * button component
 * @param onClick - Function to call when button is clicked
 * @param text - Button text to display
 */
export const Button = ({ onClick, text }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-verba-green hover:bg-opacity-100 text-verba-green italic py-3 px-6 rounded-md font-caudex text-lg md:text-xl transition-all duration-300 hover:shadow-lg"
    >
      {text}
    </button>
  );
};
