import { BrowserRouter } from "react-router-dom";
import "./assets/styles/app.css";
import Loader from "./components/Loader";
import Toast from "./components/Toast";
import GlobalState from "./GlobalState";
import Navigation from "./navigation/Navigation";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((err) => {
          console.log("Service Worker registration failed: ", err);
        });
    }
  }, []);
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
