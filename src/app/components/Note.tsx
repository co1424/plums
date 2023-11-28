'use client';
import Link from 'next/link';
import React from 'react';
import CardModal from './ModalNote';
import { Flowbite, Button } from 'flowbite-react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { buttonTheme } from './themes';
import UrlRender from './UrlRender';
import ImageRender, { image } from './ImageRender';
import FileRender from './FileRender';
import { FaTrashAlt } from "react-icons/fa";
import { TbTrash } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";

const Note = ({ note, onDelete }: any) => {
  const { id, title, content, urls, images, files } = note;
  // const { id: urlId, url, description: urlDescription } = urls || {};
  // const { id: imageId, image, description: imageDescription } = images || {};
  // const { id: fileId, file, description: fileDescription } = files || {};
  const [openModal, setOpenModal] = useState(false);
  

  const deleteIt = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/note`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (result.ok) {
        // Call the callback provided by the parent component
        onDelete(id);
        console.log("Note successfully deleted!")
      } else {
        console.error('Error deleting note:', result.statusText);
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  
  const twnd = "h-40 w-auto"

  return (
    <div className=" mt-4 bg-white border-1 border-purple-600 rounded-lg max-w-xs min-w-80 p-4 max-h-auto overflow-hidden relative group transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
      <Link href={`/notes/${id}`}>
        <div>
        <h1 className="font-bold text-center text-2xl mb-2">{title}</h1>
          <hr />
          <br />
          <p className='italic text-gray-500 mb-2 text-xs'>Notes:</p>
          <p>{content}</p>
          
          {/* Conditionally render URL */}
          <br />
          <p className='italic text-gray-500 mb-2 text-xs'>Your Links:</p>
          {urls.length > 0 && (
            urls.map((url: { id: any; }) => {
              return (<UrlRender key={url.id} url={url} />);
            })
          )}
          
          {/* Conditionally render image */}
          <p className='italic text-gray-500 mb-2 text-xs'>Your Images:</p>
          <div className='flex justify-center'>
          {images.length > 0 && (
            images.map((image: image) => {
              return (<ImageRender key={image.id} image={image} twnd={twnd} />);
            })
          )}
          </div>
          
          {/* Conditionally render file */}
          <p className='italic text-gray-500 mb-2 text-xs'>Your Files:</p>
          {files.length > 0 && (
            files.map((file: { id: any; }) => {
              return (<FileRender key={file.id} file={file} />);
            })
          )}

        </div>
      </Link>

      <div className=' h-16 w-full absolute bottom-0 right-0 justify-end items-center  flex'>
      <button onClick={() => setOpenModal(true)} className="focus:outline-none hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500">
      <AiOutlineEdit size={28} color="black" />
      </button>
      {openModal && (
        <CardModal
          onCloseModal={() => setOpenModal(false)}
          showCloseButton={false}
        />
      )}
        <button onClick={deleteIt} className='hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500'>
        <TbTrash size={"2em"}/>
        </button>
      </div>
    </div>
  );
};

export default Note;
