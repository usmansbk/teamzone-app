import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import client from "./config/graphqlClient";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider value={client}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
