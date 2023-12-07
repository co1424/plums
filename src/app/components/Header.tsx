'use client';
import exp from 'constants';
import { useScrollTop } from './use-scroll-top';
import Link from 'next/link';
import Image from 'next/image';
import plumsTitle from '../../../public/images/plums-title.png';
import plumsProfile from '../../../public/images/plum_profile.svg';

import CardModalNewTopic from '../components/ModalNewTopic';

import CardModal from '../components/ModalNote';
import { useState } from 'react';
import React, { useEffect } from 'react';
import apiUrl from '../config';

const purpleBackgroundColor = {
  backgroundColor: 'rgba(250, 245, 255, 1)',
};

function Header() {
  const [openModalNewTopic, setOpenModalNewTopic] = useState(false);
  const [openModalNewNote, setOpenModalNewNote] = useState(false);
  const [tagIdToDelete, setTagIdToDelete] = useState<string | null>(null);
  const scrolled = useScrollTop();
  const headerStyle = `flex justify-between items-center px-1 py-1 min-h-fit${
    scrolled ? ' border-b shadow' : ''
  }`;

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
      const result = await fetch(`${apiUrl}api/tag`, {
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
  console.log(tags);

  console.log(scrolled);


  return (
    <header className="sticky top-0 bg-white z-50">
      <nav>
        <ul
          className={
            headerStyle + ' flex justify-between items-center bg-white'
          }
        >
          {/* Home button on the left */}
          <li>
            <Link
              href="welcome"
              className="pi pi-home text-black"
              style={{ fontSize: '2rem', padding: '10px' }}
            ></Link>
          </li>

          {/* Centered items */}
          <ul className="flex justify-evenly items-center space-x-4 flex-grow">
            {/* Notes buttons */}
            <button
            
              className="p-1 flex-shrink-0 text-lg"
              onClick={() => setOpenModalNewTopic(true)}
              
            >
              New Tag
            </button>

            {openModalNewTopic && (
              <CardModalNewTopic
                onCloseModal={() => setOpenModalNewTopic(false)}
                showCloseButton={false}
                onNewTag={handleNewTag}
              />
            )}

            <button
              className="p-1 flex-shrink-0 text-lg "
              onClick={() => setOpenModalNewNote(true)}
            >
              New Note
            </button>

            {openModalNewNote && (
              <CardModal
                onCloseModal={() => setOpenModalNewNote(false)}
                showCloseButton={false}
              />
            )}

            <button className="p-1 flex-shrink-0 text-lg">All Notes</button>
          </ul>

          {/* Plums title and image on the right */}
          <li className="flex items-center">
            {/* Plums title (centered on small screens) */}
            <div className="hidden md:block p-2">
              <div className="w-40">
                <Image src={plumsTitle} alt="title" />
              </div>
            </div>

            {/* Plum image on the right */}
            <div className="w-12 md:w-20 ml-auto">
              <Image src={plumsProfile} alt="Plum-Image" />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
