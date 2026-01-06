import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import Editor from "./editor";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/documents/:id" element={<Editor />} />
    </Routes>
  </BrowserRouter>
);
