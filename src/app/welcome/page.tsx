'use client';
import React, { useEffect } from 'react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { buttonTheme } from '../components/themes';
import CardModalNewTopic from '../components/ModalNewTopic';
import CardModalNewNote from '../components/ModalNewNote';
// import TagList from '../components/TagList';

function Welcome() {
  const [openModalNewTopic, setOpenModalNewTopic] = useState(false);
  const [openModalNewNote, setOpenModalNewNote] = useState(false);

  interface tagResponse {
    id: string;
    name: string;
    description: string;
    image: string;
    authorId: string;
  }

    const [tags, setTags] = useState<tagResponse[]>([]);
  
    useEffect(() => {
      const fetchData = async () => {
        const result = await fetch('http://localhost:3000/api/tag', {
          cache: 'no-store',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const tagsData: tagResponse[] = await result.json();
        setTags(tagsData);
      };
      fetchData();
    }, []); // Run once when the component mounts
    console.log(tags)

    const handleNewTag = async (newTag: tagResponse) => {
      setTags((prevTags) => [...prevTags, newTag]);
    };
    

  return (
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
          onNewTag={handleNewTag}
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
      {tags.map((tag: tagResponse) => (

        // this means that I need a [topic] file so the url says the topic I'm in
        <a key={tag.id} href={`/${tag.name}/${tag.id}`}>
          <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
            {tag.name}
          </button>
        </a>
      ))}
    </Flowbite>

      </main>
  );
}

export default Welcome;
