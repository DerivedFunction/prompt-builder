import box from "../src/images/box.svg";
const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 justify-center">
        <img src={box} alt="logo icon" className="h-16 dark:invert" />
        <p className="text-2xl font-medium ">Options</p>
      </div>
      <p className="text-md mt-2 flex justify-center">Enable Scripting</p>
    </div>
  );
};
export default HomePage;
