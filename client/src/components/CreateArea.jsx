import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContextProvider";
import { MdAdd } from "react-icons/md";
import axios from "axios";

function CreateArea() {
  const { note, setNote } = useContext(NoteContext);
  const url = "http://localhost:5000/todos";
  function handleChange(e) {
    const { name, value } = e.target;
    setNote((note) => {
      return {
        ...note,
        [name]: value,
      };
    });
  }
 

  const postTodo = () => {
    axios
      .post(url, note)
      .then((res) => console.log(res.data))
      .catch((err) => console.log("error:", err));
  };
  function handleAdd(e) {
    e.preventDefault();
    postTodo();

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
          <MdAdd className="pos" size={30} />
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
