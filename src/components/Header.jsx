import React from "react";
import { GoNote } from "react-icons/go";

function Header() {
  return (
    <header>
      <GoNote size={40} color={"white"} />
      <h1>Keeper</h1>
    </header>
  );
}

export default Header;
