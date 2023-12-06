'use client';
import React, { useEffect } from 'react';
import ModalEditNote from './ModalEditNote';
import 'primeicons/primeicons.css';
import { useState } from 'react';

import { TbTrash } from "react-icons/tb";
import { AiOutlineEdit } from "react-icons/ai";
import Link from 'next/link';
import Image from 'next/image';
import apiUrl from '../config';

const Note = ({ note, onDelete, onImageDelete }: any) => {
  const { id, title, content, urls, images, files } = note;
  const [openModal, setOpenModal] = useState(false);
  const [mutableTitle, setMutableTitle] = useState(title);
  const [mutableContent, setMutableContent] = useState(content);
  const [ mutableUrls, setMutableUrls] = useState(urls);
  const [ mutableImages, setMutableImages] = useState(images);
  const [mutableNote, setMutableNote] = useState(note)
  const [isEdited, setIsEdited] = useState(true)


    
  if(isEdited){
    setMutableNote({ id, mutableTitle, mutableContent, mutableUrls, mutableImages, files });
    setIsEdited(false)
  }

  const updateImages = (NewImages: string[]) => {
    setMutableImages(NewImages)
    onImageDelete(NewImages, id);
  }
  
  const deleteIt = async () => {
    try {
      const result = await fetch(`${apiUrl}api/note`, {
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

  

  return (
    <div  className=" mt-4 bg-white border-1 cursor-pointer border-purple-600 rounded-lg max-w-sm w-80  min-w-80 p-4 max-h-[405px] overflow-hidden relative group transition duration-300 ease-in-out transform hover:scale-105 shadow-md">
      
      <a onClick={() => setOpenModal(true)}>
        
        <div>
        <h1 className="font-bold text-center text-2xl mb-2">{mutableTitle}</h1>
          <hr />
          <hr />
          <p className='italic text-gray-500 mb-2 text-xs'>Notes:</p>
          <p>{mutableContent}</p>
          
          {/* Conditionally render URL */}
          <br />
          <p className='italic text-gray-500 mb-2 text-xs'>Your Links:</p>
          {mutableUrls.length > 0 && (
            mutableUrls.map((url: { id: string, url:any, description:string }) => {
                return  (              
              <div id={id} key={id} >
              <a target='_blank' key={id} href={url.url}>{url.url}</a>
              <br />
              {url.description && <p>{url.description}</p>} 
              <br />
              </div>)
            })
          )}
          
          {/* Conditionally render image */}
          <p className='italic text-gray-500 mb-2 text-xs'>Your Images:</p>
          <div className='flex justify-center'>
          {mutableImages.length > 0 && (
            mutableImages.map((image: any) => {
              return (<Image width={128} height={128} key={image.id} src={image.image} alt={image.description} />);
            })
          )}
          </div>
          
          {/* Conditionally render file */}
          <p className='italic text-gray-500 mb-2 text-xs'>Your Files:</p>
          {files.length > 0 && (
            files.map((file: { id: any, file:string, description:string }) => {
              return (    <div id={id} key={file.id} >
                <a target='_blank' href={content}>*</a>
                <br />
                {file.description && <p>{file.description}</p>}
                <br />
            </div>);
            })
          )}

        </div>
      </a>

      {/* <button onClick={() => setOpenModal(true)} className="focus:outline-none hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500">
      <AiOutlineEdit size={28} color="black" />
    </button> */}
      {openModal && (
        <ModalEditNote 
          onCloseModal={() => setOpenModal(false)}
          showCloseButton={false}
          note={mutableNote}
          updateTitle={(newTitle: string) => setMutableTitle(newTitle)}
          updateContent={(newComponent: string) => setMutableContent(newComponent)}
          updateUrls= {(newUrls: string[]) => setMutableUrls(newUrls)}
          updateImages= {(newImages: string[]) => updateImages(newImages)}
          updateNote={() => setIsEdited(true)}
        />
      )}
    <div className=' h-16 w-full absolute bottom-0 right-0 justify-end items-center  flex'>
        <button onClick={deleteIt} className='hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500'>
        <TbTrash size={"2em"}/>
        </button>
      </div>
    </div>
  );
};

export default Note;
