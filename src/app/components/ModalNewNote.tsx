// 'use client';
import {
  Modal,
  Button,
  TextInput,
  Label,
  Textarea,
  FileInput,
  Flowbite,
} from 'flowbite-react';
import { useState } from 'react';
import { buttonTheme } from './themes';
import Note from './Note';

interface CardModalProps {
  onCloseModal: () => void;
  showCloseButton?: boolean;
}

function CardModalNewNote({
  onCloseModal,
  showCloseButton = true,
}: CardModalProps) {
  const [email, setEmail] = useState('');

  function onClose() {
    onCloseModal();
    setEmail('');
  }

  return (
    <>
      <Modal show={true} size="md" onClose={onCloseModal} popup dismissible>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg md:max-w-md mx-auto">
            

            <div id="add-notes">
              <Label htmlFor="topic_notes">Notes</Label>
              
              <Textarea
                id="topic_notes"
                placeholder="  Enter your personal notes here:"
                rows={5}
              />
            </div>
            <div className='flex flex-row'>
              <div id="upload-image">
                <Label htmlFor="file" value="Upload Image" />
                <FileInput id="file" helperText="Add an image " />
              </div>
              <div id="upload-file">
                <Label htmlFor="file" value="Upload File" />
                <FileInput id="file" helperText="Add a file " />
              </div>
            </div>

            {/* Always render the close button */}
            {showCloseButton && (
              <Button
                className="text-black bg-purple-500 hover:bg-purple-600 py-2 px-4 rounded-md"
                onClick={onClose}
              >
                Close modal
              </Button>
            )}
          </form>
        </Modal.Body>
        <br />
        <Flowbite theme={{ theme: buttonTheme }}>
          <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
            Create New Note
          </button>
        </Flowbite>
      </Modal>

      <style jsx>{`
        .custom-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(
            255,
            255,
            255,
            0.5
          ); /* Adjust the alpha value for reduced opacity */
          z-index: 999;
        }
      `}</style>
    </>
  );
}

export default CardModalNewNote;
