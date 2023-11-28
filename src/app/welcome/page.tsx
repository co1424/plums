'use client';
import React, { useEffect } from 'react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { buttonTheme } from '../components/themes';
import CardModalNewTopic from '../components/ModalNewTopic';
import CardModalNewNote from '../components/ModalNewNote';
import CardModalNote from '../components/ModalNote';
// import TagList from '../components/TagList';
import { TbTrash } from 'react-icons/tb';

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
  console.log(tags);

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
        <CardModalNote
          onCloseModal={() => setOpenModalNewNote(false)}
          showCloseButton={false}
        />
      )}
      <br />
      <br />
      <br />

      <h2 className="text-xl font-bold">Your existing topics:</h2>
      <br />

      <div className="flex flex-row flex-wrap justify-center">
        {tags.map((tag: tagResponse) => (
          // this means that I need a [topic] file so the url says the topic I'm in
          <div className="min-w-[350px] max-w-[350px] bg-white overflow-hidden shadow-md sm:rounded-lg p-4 m-4">
            <a key={tag.id} href={`/${tag.name}/${tag.id}`} className="block">
              <div>
                <p className="text-xl font-semibold text-black-500 mb-2 text-center">
                  {tag.name}
                </p>
                <p className="text-gray-700">{tag.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Welcome;
