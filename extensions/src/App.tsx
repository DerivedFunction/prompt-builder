import "./App.css";
import HomePage from "../pages/home-page";
function App() {
  return (
    <>
      <div className="relative flex h-screen overflow-hidden w-full">
        <main
          className={`flex-1 transition-all duration-300 flex flex-col justify-between overflow-hidden`}
        >
          <div className="flex justify-center p-3 overflow-y-auto">
            <div className={`w-full space-y-3 py-4`}>
              <HomePage />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
