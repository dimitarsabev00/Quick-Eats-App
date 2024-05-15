import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { Provider } from "react-redux";
import store from "./store/index.ts";
import "swiper/css";
import "swiper/css/bundle";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
