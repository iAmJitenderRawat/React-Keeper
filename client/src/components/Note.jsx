import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { NoteContext } from "../context/NoteContextProvider";

function Note() {
  const { notes, setNotes, note, setNote } = useContext(NoteContext);
  const url = "http://localhost:5000/todos";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log("postError:", err));
  });

  function handleDelete(id) {
    axios
      .delete(url + "/" + id)
      .then((res) => console.log(res, "got deleted"))
      .catch((err) => console.log("deleteError:", err));
  }

  return (
    <div>
      {notes &&
        notes.map((item) => {
          return (
            <div className="note" key={item._id}>
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <div className="flex">
                <button onClick={() => handleDelete(item._id)}>
                  <DeleteIcon className="pos red" size={25} />
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Note;
