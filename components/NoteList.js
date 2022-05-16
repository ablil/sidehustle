import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import notifier from "../helpers/notifier";
import {
  addNote,
  removeNote,
  replaceAllNotes,
  toggleNoteLoading,
  updateNote,
} from "../redux/slices/note";
import service from "../services/firebaseservice";
import Note from "./Note";

const NoteList = ({ keyword }) => {
  const router = useRouter();
  const { id } = router.query;

  const loadingNote = useSelector((state) => state.notes.loading);
  const notes = useSelector((state) => state.notes.notes[id]);

  const filteredNotes = useMemo(
    () =>
      notes?.filter(
        (note) => note.content.includes(keyword) || keyword.length === 0
      ) || [],
    [notes, keyword]
  );
  const [editable, setEditable] = useState();
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleNoteLoading(true));
    service.note
      .loadAll(id)
      .then((notes) => dispatch(replaceAllNotes({ idea: id, notes })))
      .catch((err) => notifier.error(err, "failed to load notes"))
      .finally(() => dispatch(toggleNoteLoading(false)));

    return () => {};
  }, [dispatch, id]);

  const handleSubmitNote = (note) => {
    if (note.id === "new") {
      const tocreate = { ...note, id: v4() };
      dispatch(addNote({ idea: id, note: tocreate }));
      setEditMode(false);

      service.note
        .add(tocreate.id, id, tocreate)
        .catch((err) => notifier.error(err, "failed to add note"))
        .catch(() => dispatch(removeNote({ idea: id, id: tocreate.id })));
    } else {
      dispatch(updateNote({ idea: id, note }));
      setEditable(undefined);

      service.note
        .update(note.id, id, note)
        .catch((err) => notifier.error(err, "failed to add note"))
        .catch(() => dispatch(removeNote({ idea: id, id: note.id })));
    }
  };

  const handleRemoveNote = (note) => {
    if (note.id === "new") {
      setEditMode(false);
    } else {
      dispatch(removeNote({ idea: id, id: note.id }));
      service.note
        .remove(note.id, id)
        .catch((err) => notifier.error(err, "failed to remove note"))
        .catch(() => dispatch(addNote({ idea: id, note })));
    }
  };

  const toggleEditMode = (id) => {
    if (editable === id) setEditable(undefined);
    else setEditable(id);
  };

  const onAddNewNote = (evt) => {
    setEditMode(true);
  };

  if (loadingNote) {
    return null;
  } else if (notes) {
    return (
      <section id="notes">
        <header className="tab-content-header">
          <p>Type whatever pops on your head, and save notes for yourself !</p>
        </header>

        <section id="useful-links">
          <header>
            <button onClick={onAddNewNote}>create new note</button>
          </header>

          <hr style={{ opacity: ".1" }} />

          <section id="notes-list">
            {!loadingNote &&
              filteredNotes?.map(
                (note) =>
                  note && (
                    <Note
                      key={note.id}
                      note={note}
                      editable={editable && note.id === editable}
                      onSave={handleSubmitNote}
                      onRemove={handleRemoveNote}
                      toggleEdit={() => toggleEditMode(note.id)}
                    />
                  )
              )}
            {editMode && (
              <Note
                note={{ id: "new", title: "", content: "" }}
                editable={editMode}
                onSave={handleSubmitNote}
                onRemove={handleRemoveNote}
                toggleEdit={() => setEditMode(false)}
              />
            )}
          </section>
        </section>
      </section>
    );
  } else {
    return "an error occured";
  }
};

export default NoteList;
