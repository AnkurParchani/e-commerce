import React from "react";
import NavigationBar from "./NavigationBar";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<NavigationBar />} />
      </Routes>
    </div>
  );
}
