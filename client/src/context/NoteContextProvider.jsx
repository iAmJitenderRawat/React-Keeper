import React, { createContext, useState } from "react";

export const NoteContext = createContext();
export const NoteContextProvider = ({ children }) => {
  const [note, setNote] = useState({
    title: "",
    content:""
  });
  
  const [notes, setNotes] = useState([]);
  return (
    <NoteContext.Provider
      value={{ note, setNote, notes, setNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};
