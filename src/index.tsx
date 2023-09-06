import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { AppContextProvider } from "./components/AppContextProvider";
import { TransactionProvider } from './utils/TransactionContext'; // Added this line

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AppContextProvider>
    <TransactionProvider>   {/* Added this line */}
      <App />
    </TransactionProvider>  {/* Added this line */}
  </AppContextProvider>
);