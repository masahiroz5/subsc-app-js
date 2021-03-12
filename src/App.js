import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { InputArea } from "./components/InputArea";
import { DisplayArea } from "./components/DisplayArea";

function App() {
  return (
    <div className="App">
      <Header />
      <InputArea />
      <DisplayArea />
    </div>
  );
}

export default App;
