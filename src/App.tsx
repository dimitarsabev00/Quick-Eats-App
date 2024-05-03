import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./components/Routes";

const App = () => {
  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      <Router>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
