import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/Navigation";
import "./assets/styles/app.css";
import Loader from "./components/Loader";
import Toast from "./components/Toast";

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
