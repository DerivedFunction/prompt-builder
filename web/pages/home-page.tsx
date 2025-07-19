import box from "../src/images/box.svg";
const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 justify-center">
        <img src={box} alt="logo icon" className="h-16 dark:invert" />
        <p className="text-2xl font-medium ">AI Prompt Builder</p>
      </div>
      <p className="text-md mt-2 flex justify-center">
        Build better AI prompts. All in one place.
      </p>
      <br />
      <p className="text-xs mt-2 flex justify-center">
        All prompts are stored locally and generated in your browser.
      </p>
      <p className="text-xs mt-2 flex justify-center">
        AI-generated content can make mistakes. Check for important info.
      </p>
    </div>
  );
};
export default HomePage;
