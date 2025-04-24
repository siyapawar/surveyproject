import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "./utils/i18n";

// Determine the base path based on the deployment environment
// For GitHub Pages, it's usually the repository name
const basename = import.meta.env.MODE === "production" ? "/surveyproject" : "/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Add the basename prop to BrowserRouter */}
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
