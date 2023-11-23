'use client';
import Link from 'next/link';
import React from 'react';
import CardModal from './ModalEditNote';
import { Flowbite, Button } from 'flowbite-react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { buttonTheme } from './themes';

const Note = ({ note }: any) => {
  const { id, title, note_content } = note || {};
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="border-2 rounded-lg max-w-xs min-w-80 p-3 ">
      <Link href={`/notes/${id}`}>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p>{note_content}</p>
        </div>
      </Link>
      <Flowbite theme={{ theme: buttonTheme }}>
        <Button
          className={`${buttonTheme.button.color.primary}`}
          onClick={() => setOpenModal(true)}
        >
          View Details
        </Button>
      </Flowbite>
      {openModal && (
        <CardModal
          onCloseModal={() => setOpenModal(false)}
          showCloseButton={false}
        />
      )}
    </div>
  );
};

export default Note;
