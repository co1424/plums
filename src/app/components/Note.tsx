'use client';
import Link from 'next/link';
import React from 'react';
import CardModal from './ModalNote';
import { Flowbite, Button } from 'flowbite-react';
import 'primeicons/primeicons.css';
import { useState } from 'react';
import { buttonTheme } from './themes';
import UrlsRender from './urlRender';
import UrlRender from './urlRender';
import ImageRender from './ImageRender';
import FileRender from './fileRender';

const Note = ({ note }: any) => {
  const { id, title, content, urls, images, files } = note;
  // const { id: urlId, url, description: urlDescription } = urls || {};
  // const { id: imageId, image, description: imageDescription } = images || {};
  // const { id: fileId, file, description: fileDescription } = files || {};
  const [openModal, setOpenModal] = useState(false);

  console.log("esta es la nota que llega al note component", note);

  return (
    <div className="border-2 rounded-lg max-w-xs min-w-80 p-3 ">
      <Link href={`/notes/${id}`}>
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
            images.map((image: { id: any; }) => {
              return (<ImageRender key={image.id} image={image} />);
            })
          )}
          
          {/* Conditionally render file */}
          {files.length > 0 && (
            files.map((file: { id: any; }) => {
              return (<FileRender key={file.id} file={file} />);
            })
          )}

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
