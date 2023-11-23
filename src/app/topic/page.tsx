import React from 'react';
import notes from '../../data/mockNotes.json';
import Note from '@/components/Note';
import CardModal from '@/components/ModalEditNote';

const Topic = () => {
  return (
    <div className=" h-screen  overflow-y-auto">
      <div className="flex flex-wrap gap-4 justify-center  mx-4">
        {notes.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
};

export default Topic;
