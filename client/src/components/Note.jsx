import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FiEdit } from "react-icons/fi";
import { NoteContext } from "../context/NoteContextProvider";
import { Loading } from "./Loading";
import moment from "moment";

function Note() {
  const {
    notes,
    setNotes,
    isLoading,
    setIsLoading,
    setIsUpdate,
    note,
    setNote,
  } = useContext(NoteContext);
  const url = `${import.meta.env.VITE_URL}/todos`;

  function getNotes() {
    axios
      .get(url)
      .then((res) => {
        setIsLoading(false);
        setNotes(res.data);
      })
      .catch((err) => console.log("postError:", err));
  };

  useEffect(() => {
    getNotes();
  }, [note]);

  function handleDelete(id) {
    axios
      .delete(url + "/" + id)
      .then((res) => {
        setIsLoading(false);
        getNotes();
      })
      .catch((err) => console.log("deleteError:", err));
  }

  function handlePatch(id) {
    axios
      .get(`${url}/${id}`)
      .then((res) => {
        setIsLoading(false);
        setNote(res.data);
        setIsUpdate(true);
        getNotes();
      })
      .catch((err) => console.log("postError:", err));
  }

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        notes &&
        notes.map((item) => {
          return (
            <div className="note" key={item._id}>
              <h1 className="center">{item.title}</h1>
              <p className="center">{item.content}</p>
              <div className="flex">
                <div>
                  <p>{moment(item.createdAt).format("L")}</p>
                  <p>{moment(item.updatedAt).format("L")}</p>
                </div>
                <div>
                  <button onClick={() => handlePatch(item._id)}>
                    <FiEdit className="pos black" size={15} />
                  </button>
                  <button onClick={() => handleDelete(item._id)}>
                    <DeleteIcon className="pos red" size={25} />
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Note;
