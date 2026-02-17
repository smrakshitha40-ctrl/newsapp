import React from "react";
import "./App.css";
import Navbar from "./component/Navbar";
import News from "./component/News";

function App() {
  return (
    <>
      <Navbar title="NewsApp" />
      <News />
    </>
  );
}

export default App;