import React, { useEffect, useState } from "react";
import ListsCard from "./components/ListsCard";
import Button from "./components/Button";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
