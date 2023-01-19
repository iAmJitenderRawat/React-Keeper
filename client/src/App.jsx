import React from "react";
import CreateArea from "./components/CreateArea";
import Footer from "./components/Footer";
import { Header } from "./components/Header";
import Note from "./components/Note";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <CreateArea />
      <Note title="Note title" content="Note content" />
      <Footer />
    </div>
  );
}

export default App;
