'use client'
import {
  Modal,
  Button,
  TextInput,
  Label,
  Textarea,
  FileInput,
  Flowbite
} from 'flowbite-react';
import { useState } from 'react';
import { buttonTheme } from './themes';

import { useRouter, redirect } from 'next/navigation';

interface CardModalProps {
  onCloseModal: () => void;
  showCloseButton?: boolean;
}



function CardModalNewTopic ({ onCloseModal, showCloseButton = true, onNewTag }: any ) {
  const [email, setEmail] = useState('');

  function onClose() {
    onCloseModal();
    setEmail('');
  }

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      let fileReader = new FileReader();
  
      fileReader.onload = function (fileLoadedEvent) {
        if (fileLoadedEvent.target) {
          let srcData = fileLoadedEvent.target.result as string;
          setImage(srcData);
        }
      };
  
      fileReader.readAsDataURL(selectedFile);
    }
  };
  

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = { 
      "name": name,
      "image": image,
      "description": description
    }
    console.log(JSON.stringify({ data }))

    try {
      const response = await fetch('http://localhost:3000/api/tag', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, image, description }),
      });
      const data = await response.json();
      console.log("the answer from the api after creating a new tag", data)
      if (response.ok) {
        onNewTag(data.result)
        console.log('Tag created successfully:');
        onCloseModal();
      } else {
        console.error('Failed to create tag:', data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setName('');
    setDescription('');
  };
  return (
    <>
      <Modal show={true} onClose={onCloseModal} popup dismissible className='mx-auto p-[80px] bg-white'>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg md:max-w-md mx-auto ">
            <h2 className="text-xl font-medium text-black dark:text-white mb-4 ">
              Add New Topic/Tag
            </h2>
            <div id='add-name'>
            <Label htmlFor="topic_name">Topic/Tag Name</Label>
            <TextInput
              type="text"
              id="topic_name"
              name='name'
              placeholder="  Enter topic name"
              onChange={handleNameChange}
              required
            />
            </div>
            
            <div id="upload-image">
              <Label htmlFor="file" value="Upload Image" />
              <FileInput 
              onChange={handleImageChange} 
              id="file" 
            />
            </div>

            <div id='add-description'>
            <Label htmlFor="topic_notes">Description</Label>
            <Textarea
              id="topic_notes"
              name='description'
              placeholder="  Enter a tag/topic description here:"
              onChange={handleDescriptionChange}
            />
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

        <Flowbite theme={{ theme: buttonTheme }}>
      <button type="submit"  className={`mb-4 ${buttonTheme.button.color.primary}`}>Create</button>
      </Flowbite>
          </form>
        </Modal.Body>
        <br />
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

export default CardModalNewTopic;
