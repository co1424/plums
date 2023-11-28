'use client';
import React from 'react';
import ModalEditNote from './ModalEditNote';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import UrlRender from './UrlRender';
import ImageRender, { image } from './ImageRender';
import FileRender from './FileRender';
import { TbTrash } from "react-icons/tb";

const Note = ({ note, onDelete }: any) => {
  const { id, title, content, urls, images, files } = note;
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
    <div className="border-2 rounded-lg max-w-xs min-w-80 p-3 max-h-[500px] overflow-hidden relative group cursor-pointer">
      <a onClick={() => setOpenModal(true)} >
        <div>
          <h2 className="font-bold">{title}</h2>
          <p>{content}</p><br />
          
          {/* Conditionally render URL */}
          {urls.length > 0 && (
            urls.map((url: { id: any; }) => {
              return (<UrlRender key={url.id} url={url} />);
            })
          )}
          
          {/* Conditionally render image */}
          {images.length > 0 && (
            images.map((image: image) => {
              return (<ImageRender key={image.id} image={image} twnd={twnd} />);
            })
          )}
          
          {/* Conditionally render file */}
          {files.length > 0 && (
            files.map((file: { id: any; }) => {
              return (<FileRender key={file.id} file={file} />);
            })
          )}

        </div>
      </a>

      {openModal && (
        <ModalEditNote 
          onCloseModal={() => setOpenModal(false)}
          showCloseButton={false}
          note={note}
        />
      )}

      <div className='bg-white h-16 w-full absolute bottom-0 right-0 justify-end items-center  flex'>
        <button onClick={deleteIt} className='hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500'>
        <TbTrash size={"2em"}/>
        </button>
      </div>
    </div>
  );
};

export default Note;
