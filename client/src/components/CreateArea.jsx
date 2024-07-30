import React, { useContext, useRef } from "react";
import { NoteContext } from "../context/NoteContextProvider";
import { GrUpdate } from "react-icons/gr";
import { MdAdd } from "react-icons/md";
import axios from "axios";

function CreateArea() {
  const { note, setNote, setNotes, isUpdate, setIsUpdate, setIsLoading } = useContext(NoteContext);
  const url = `${import.meta.env.VITE_URL}/todos`;

  function getNotes() {
    axios
      .get(url)
      .then((res) => {
        setIsLoading(false);
        setNotes(res.data);
      })
      .catch((err) => console.log("postError:", err));
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNote((note) => {
      return {
        ...note,
        [name]: value,
      };
    });
  }

  const addTodo = () => {
    axios
      .post(url, note)
      .then((res) => getNotes())
      .catch((err) => console.log("error:", err));
  };
  const updateToDo = () => {
    axios
      .patch(url + `/${note._id}`, {
        _id: note._id,
        title: note.title,
        content: note.content,
      })
      .then((data) => {
        setNote("");
        setIsUpdate(false);
      })
      .catch((err) => console.log(err));
  };
  function handleAdd(e) {
    e.preventDefault();
    isUpdate ? updateToDo() : addTodo();
    getNotes();
    setNote({
      title: "",
      content: "",
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          type={"text"}
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.content}
        />
        <button onClick={handleAdd}>
          {isUpdate ? (
            <GrUpdate className="pos" size={30} />
          ) : (
            <MdAdd className="pos" size={30} />
          )}
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
