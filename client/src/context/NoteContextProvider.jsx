import React, { createContext, useState } from "react";

export const NoteContext = createContext();
export const NoteContextProvider = ({ children }) => {
  const [note, setNote] = useState({
    title: "",
    content:""
  });
  const [isUpdate, setIsUpdate]=useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  return (
    <NoteContext.Provider
      value={{
        note,
        setNote,
        notes,
        setNotes,
        isUpdate,
        setIsUpdate,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};
