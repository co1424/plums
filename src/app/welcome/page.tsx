'use client';
import React from 'react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { buttonTheme } from '../components/themes';
import CardModalNewTopic from '../components/ModalNewTopic';
import TagList from '../components/TagList'; 

function Welcome() {
  const [openModal, setOpenModal] = useState(false);

  return (
      <main className="flex flex-col items-center justify-center ">
        <br />
        <br />
        <h1 className="text-xl font-bold">Welcome!</h1>
        <br />
        <Flowbite theme={{ theme: buttonTheme }}>
          <Button
            className={`${buttonTheme.button.color.primary}`}
            onClick={() => setOpenModal(true)}
          >
            Create New Topic
          </Button>
        </Flowbite>
        {openModal && (
          <CardModalNewTopic
            onCloseModal={() => setOpenModal(false)}
            showCloseButton={false}
          />
        )}
        <br />
        <br />
        <br />
        <br />

        <h2 className="text-xl font-bold">Your existing topics:</h2>
        <br />

        <TagList/>

      </main>
  );
}

export default Welcome;
