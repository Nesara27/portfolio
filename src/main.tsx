
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// 👇 Optional: quick check to confirm env variables are loading
console.log("🔍 ENV CHECK", {
  api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
  token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
  env: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
