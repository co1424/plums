// 'use client';
import {
  Modal,
  Button,
  TextInput,
  Label,
  Textarea,
  FileInput,
  Flowbite
} from 'flowbite-react';
import { useState, useEffect } from 'react';
import { buttonTheme } from './themes';
import Note from './Note';
import { TbTrash } from 'react-icons/tb';

interface CardModalProps {
  onCloseModal: () => void;
  showCloseButton?: boolean;
}



interface image{
  id: string
  noteId: string
  image: string
  description: string
}
interface file{
  id: string
  noteId: string
  file: string
  description: string
}
interface url{
  id: string
  noteId: string
  url: string
  description: string
}
type UrlObject = {
  id: string;
  url: string;
  description: string;
  isEditing: boolean;
};
interface note{
  id: string
  mutableTitle: string
  mutableContent: string
  tagIds: string[]
  authorId: string
  images: image[]
  files: file[]
  mutableUrls: url[]
}
interface props{
  onCloseModal: () => void
  showCloseButton: boolean
  note:note
  updateTitle: any 
  updateContent: any
  updateUrls: any
  updateNote:any
}

function ModalEditNote({ onCloseModal, showCloseButton = false, note,  updateTitle, updateContent, updateUrls, updateNote }: props) {
  const { id, mutableTitle:title, mutableContent:content, mutableUrls:urls, images, files } = note;
  
  const [titleEdited, setTitleEdited] = useState(title);
  const [contentEdited, setContentEdited] = useState(content);

  // Use state variables to track each URL and its description
  const [urlStates, setUrlStates] = useState(
    urls.map((url) => ({ id: url.id, url: url.url, description: url.description, isEditing: false }))
  );

  useEffect(() => {
    setTitleEdited(title);
  }, [title]);

  useEffect(() => {
    setContentEdited(content);
  }, [content]);

  // Update the URL state when URLs prop changes
  useEffect(() => {
    setUrlStates(
      urls.map((url) => ({ id: url.id, url: url.url, description: url.description, isEditing: false }))

    );
  }, [urls]);
  

  function onClose() {
    onCloseModal();
  }

// Handle changes for a specific URL
const handleUrlChange = (index: number, field: keyof UrlObject, value: string) => {
  const updatedUrlStates = [...urlStates] as UrlObject[];
  updatedUrlStates[index] = {
    ...updatedUrlStates[index],
    [field]: value,
  };
  setUrlStates(updatedUrlStates);
};

// Toggle the editing state for a specific URL
const toggleUrlEditing =  (index: number) => {
  const updatedUrlStates = [...urlStates] as UrlObject[];
  updatedUrlStates[index] = {
    ...updatedUrlStates[index],
    isEditing: !updatedUrlStates[index].isEditing,
  };
  setUrlStates(updatedUrlStates);
};

const checkPayload = () => {
  const urlStatesWithoutIsEditing = urlStates.map(({ isEditing, ...rest }) => rest);
  const data =  JSON.stringify({ 
    id,
    titleEdited,
    urlStates: urlStatesWithoutIsEditing,
    contentEdited,
  })
  console.log(data)
}

const handleEdit = async () => {
  try {
    // Exclude isEditing property from urlStates
    const urlStatesWithoutIsEditing = urlStates.map(({ isEditing, ...rest }) => rest);
    console.log("urlStatesWithoutIsEditing",urlStatesWithoutIsEditing)

    const response = await fetch('http://localhost:3000/api/note', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        id,
        titleEdited,
        urlStates: urlStatesWithoutIsEditing,
        contentEdited,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      
      updateTitle(data.result.title)
      updateContent(data.result.content)
      updateUrls(urlStatesWithoutIsEditing)
      updateNote();
      onCloseModal();
    } else {
      console.error('Failed to update note:', data);
    }
  } catch (error) {
    console.error(error);
  }
};




  return (
    <>
      <Modal className='bg-gray-500 sm:px-[10%] lg:px-[30%] group' show={true} onClose={onCloseModal} popup dismissible>
        <div className='w-full mx-auto h-[600px]  rounded-lg'>

          <div className='title text-center border-gray-300 border-b-2 mt-6'>
            <textarea
              className='text-lg font-bold w-full text-center p-0 resize-none  focus:outline-none '
              value={titleEdited}
              onChange={(e) => setTitleEdited(e.target.value)}
              rows={2}
            />
          </div>

          <div className='content/urls overflow-y-auto h-80 pt-6'>
            <textarea
              className='text-base h-full w-full px-7 resize-none focus:outline-none'
              value={contentEdited}
              onChange={(e) => setContentEdited(e.target.value)}
              rows={2}
            />

            {/* Map through URL states and render textareas or clickable URLs based on the isEditing state */}
            <p className='text-xs text-gray-500 px-5'>Url</p>
            {urlStates.map((url, index) => (
              <div key={url.id}>
                {url.isEditing ? (
                  <>
                    <textarea
                      className='text-base w-full px-7 resize-none focus:outline-none'
                      value={url.url}
                      onChange={(e) => handleUrlChange(index, 'url', e.target.value)}
                      rows={2}
                    />
                    <textarea
                      className='text-base w-full px-7 resize-none focus:outline-none'
                      value={url.description}
                      onChange={(e) => handleUrlChange(index, 'description', e.target.value)}
                      rows={2}
                    />
                  </>
                ) : (
                  <>
                    <a
                      href={url.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className='text-blue-500 hover:underline px-7'
                    >
                      {url.url}
                    </a>
                    <p className='px-7'>{url.description}</p>
                  </>
                )}
                <button className='px-7' onClick={() => toggleUrlEditing(index)}>
                  {url.isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            ))}
          </div>

          {/* New container for images */}
          <div className='documents-container flex justify-between  absolute w-full bottom-16'>
            <div className='images-container w-full'>
              {/* Map through images and display them */}
              {images.map((image) => (
                <div key={image.id} >
                  <img src={image.image} alt={image.description} className=' h-[80px] ' />
                </div>
              ))}
            </div>

            <div className='files-container w-full '>
              {/* Map through files and display them */}
              {files.map((file) => (
                <div key={file.id} >
                  <img src={file.file} alt={file.description} className=' h-[80px] self-end ' />
                </div>
              ))}
            </div>
          </div>

          <div className=' h-16 w-full absolute bottom-0 right-0 justify-end items-center  flex rounded-lg '>
            <button onClick={() => {}} className='hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500 '>
              <TbTrash size={"2em"} />
            </button>
            <button onClick={handleEdit} className='hover:bg-black hover:bg-opacity-10 rounded-md active:bg-white p-1 mx-2 opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-500 font-bold'>
              Save
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalEditNote;
