import { BrowserRouter } from "react-router-dom";
import "./assets/styles/app.css";
import Toast from "./components/Toast";
import Loader from "./components/Loader";
import GlobalState from "./GlobalState";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Loader />
      <GlobalState />
      <Navigation />
    </BrowserRouter>
  );
}
export default App;
