'use client';
import React from 'react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { buttonTheme } from '../../components/themes';
import CardModalNewTopic from '../../components/ModalNewTopic';
import CardModalNewNote from '../../components/ModalNewNote';

function Welcome() {
  const [openModalNewTopic, setOpenModalNewTopic] = useState(false);
  const [openModalNewNote, setOpenModalNewNote] = useState(false);
  return (
    <div>
      <main className="flex flex-col items-center justify-center ">
        <br />
        <br />
        <h1 className="text-xl font-bold">Welcome!</h1>
        <br />
        <Flowbite theme={{ theme: buttonTheme }}>
        <Button
          className={`${buttonTheme.button.color.primary}`}
          onClick={() => setOpenModalNewTopic(true)}
        >
          Create New Topic/Tag
        </Button>
      </Flowbite>
      {openModalNewTopic && (
        <CardModalNewTopic
          onCloseModal={() => setOpenModalNewTopic(false)}
          showCloseButton={false}
        />
      )}
        <br />
        <Flowbite theme={{ theme: buttonTheme }}>
        <Button
          className={`${buttonTheme.button.color.primary}`}
          onClick={() => setOpenModalNewNote(true)}
        >
          Create New Note
        </Button>
      </Flowbite>
      {openModalNewNote && (
        <CardModalNewNote
          onCloseModal={() => setOpenModalNewNote(false)}
          showCloseButton={false}
        />
      )}
        <br />
        <br />
        <br />

        <h2 className="text-xl font-bold">Your existing topics:</h2>
        <br />
        <Flowbite theme={{ theme: buttonTheme }}>
          <a href={'/topic'}>
            <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
              TypeScript
            </button>
          </a>
        </Flowbite>
        <Flowbite theme={{ theme: buttonTheme }}>
          <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
            TailwindCSS
          </button>
        </Flowbite>
        <Flowbite theme={{ theme: buttonTheme }} className="font-bold">
          <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
            C#
          </button>
        </Flowbite>
      </main>
    </div>
  );
}

export default Welcome;
