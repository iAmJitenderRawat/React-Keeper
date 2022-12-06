import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { NoteContext } from "../context/NoteContextProvider";
// import { Loading } from "./Loading";

function Note() {
  const { notes, setNotes } = useContext(NoteContext);
  const url = "http://localhost:5000/todos";

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setNotes(res.data))
      .catch((err) => console.log("postError:", err));
  }, );

  function handleDelete(id) {
    // const newNoteList = notes.filter((item) => item._id !== id);
    // setNotes(newNoteList);
    // console.log(id);
    axios.delete(url+"/"+id)
    .then((res)=>console.log(res,"got deleted"))
    .catch(err=>console.log("deleteError:",err))
  }

  return (
    <div>
      {notes &&
        notes.map((item) => {
          return (
            <div className="note" key={item._id}>
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <button onClick={() => handleDelete(item._id)}>
                <MdDelete className="pos" size={25} />
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default Note;
