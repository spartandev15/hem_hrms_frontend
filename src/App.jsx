import { BrowserRouter } from "react-router-dom";
import "./assets/styles/app.css";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import Navigation from "./navigation/Navigation";

function App() {
  return (
    <BrowserRouter>
      <Toast />
      <Loader />
      <Navigation />
    </BrowserRouter>
  );
}
export default App;
