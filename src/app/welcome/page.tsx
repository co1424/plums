'use client';
import React, { useEffect } from 'react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { Flowbite, Button } from 'flowbite-react';
import { buttonTheme } from '../components/themes';
import CardModalNewTopic from '../components/ModalNewTopic';
import CardModalNewNote from '../components/ModalNewNote';
import CardModal from '../components/ModalNote';
// import TagList from '../components/TagList';
import { TbTrash } from 'react-icons/tb';
import { Spinner } from '../components/spinner';
import { AiOutlineEdit } from 'react-icons/ai';

function Welcome() {
  const [openModalNewTopic, setOpenModalNewTopic] = useState(false);
  const [openModalNewNote, setOpenModalNewNote] = useState(false);
  const [tagIdToDelete, setTagIdToDelete] = useState<string | null>(null);


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
  }, [tagIdToDelete]); // Run once when the component mounts
  console.log(tags);

  const handleNewTag = async (newTag: tagResponse) => {
    setTags((prevTags) => [...prevTags, newTag]);
  };

  const deleteIt = async (tagId: string) => {
    try {
      const result = await fetch('http://localhost:3000/api/tag', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: tagId }), // Pass the tagId here
      });
  
      if (result.ok) {
        console.log('Tag successfully deleted!');
        // Call a function to update your state and remove the deleted tag
        setTagIdToDelete(tagId);
      } else {
        console.error('Error deleting tag:', result.statusText);
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };
  
  

  if (tags.length === 0) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center ">
      <br />
      <br />
      <h1 className="text-xl font-bold">Welcome! Are you ready to take notes?</h1>
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
        <CardModal
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
          <div className="group min-w-[350px] max-w-[350px] bg-white overflow-hidden border-1 shadow-md sm:rounded-lg p-4 m-4 transition duration-300 ease-in-out transform hover:scale-105">
            <a key={tag.id} href={`/${tag.name}/${tag.id}`} className="block">
              <div>
                <p className="text-xl font-semibold text-black-500 mb-2 text-center">
                  {tag.name}
                </p>
                <p className="text-gray-700">{tag.description}</p>
                <br />
              </div>
            </a>
            <div className="flex items-center justify-between">
              <button
                onClick={() => deleteIt(tag.id)}
                className="hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500 ml-auto"
              >
                <TbTrash size={'2em'} />
              </button>
              <button className="focus:outline-none hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500">
                <AiOutlineEdit size={28} color="black" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Welcome;
