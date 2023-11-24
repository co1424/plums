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
import { useEffect, useState } from 'react';
import { buttonTheme } from './themes';
import Note from './Note';
import TagDropdown from './TagDropdown';
import prisma from "@/app/data";
import router from 'next/router';

interface CardModalProps {
  onCloseModal: () => void;
  showCloseButton?: boolean;
}
interface tagResponse {
  id: string;
  name: string;
}

function CardModalNote({ onCloseModal, showCloseButton = true }: CardModalProps) {
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [urlNote, setUrlNote] = useState('');
  const [image, setImage] = useState('');
  const [imageNote, setImageNote] = useState('');
  const [file, setFile] = useState('');
  const [fileNote, setFileNote] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<tagResponse[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  function onClose() {
    onCloseModal();
    setEmail('');
  }

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
  const handleTagSelection = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };
  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    console.log("handleTitleChange was called")
  };
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  const handleUrlNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlNote(event.target.value);
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
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0];
      let fileReader = new FileReader();
  
      fileReader.onload = function (fileLoadedEvent) {
        if (fileLoadedEvent.target) {
          let srcData = fileLoadedEvent.target.result as string;
          setFile(srcData);
        }
      };
  
      fileReader.readAsDataURL(selectedFile);
    }
  };
  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleImageNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setImageNote(event.target.value);
  };
  const handleFileNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFileNote(event.target.value);
  };

  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/note', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title,
          url,
          urlNote,
          image,
          imageNote,
          file,
          fileNote,
          content,
          selectedTags }),
      });
      const data = await response.json();
      console.log("the answer from the api data with the note", data)
      if (response.ok) {
        console.log('Note created successfully:', data);
        // router.replace("/welcome"); // Use replace instead of refresh for client-side navigation
      } else {
        console.error('Failed to create note:', data);
      }
    } catch (error) {
      console.error(error);
    }

  };

  return (
    <>

      <Modal show={true} size="xl" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg md:max-w-md mx-auto">
            
            <div id='add-title'>
            <Label htmlFor="title">Title</Label>
            <TextInput
              type="text"
              id="title"
              placeholder="  Enter topic name"
              onChange={handleTitleChange}
            />
            </div>

            <div id='add-url'>
            <Label htmlFor="topic_url">Topic URL</Label>
            <TextInput 
            type="text" 
            id="topic_url" 
            placeholder="Enter new URL" 
            onChange={handleUrlChange}
            />
            </div>

            <div id='add-urlNote'>
            <Label htmlFor="topic_url">URL Notes</Label>
            <TextInput 
            type="text" 
            id="topic_urlNote" 
            placeholder="Optional" 
            onChange={handleUrlNoteChange}
            />
            </div>

            <div id="upload-image">
              <Label htmlFor="file" value="Upload Image" />
              <FileInput 
              onChange={handleImageChange}
              id="file" 
              />
            </div>

            <div id='add-imageNote'>
            <Label htmlFor="topic_notes">Image Notes</Label>
            <Textarea
              id="topic_imageNotes"
              placeholder="Optional"
              onChange={handleImageNoteChange}
            />
            </div>

            <div id="upload-file">
              <Label htmlFor="file" value="Upload File" />
              <FileInput 
              id="file" 
              onChange={handleFileChange}
              />
            </div>

            <div id='add-fileNote'>
            <Label htmlFor="topic_notes">File Notes</Label>
            <Textarea
              id="topic_fileNotes"
              placeholder="Optional"
              onChange={handleFileNoteChange}
            />
            </div>

            <div id='add-notes'>
            <Label htmlFor="topic_notes">Notes</Label>
            <Textarea
              id="topic_notes"
              placeholder="Enter your personal notes here:"
              onChange={handleContentChange}
            />
            </div>

            <div id='tagSelect'>
              <Label htmlFor="tagSelect"></Label>
              <div className="relative inline-block text-left">
                <div>
                  <span className="rounded-md shadow-sm">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      id="options-menu"
                      onClick={handleDropdownToggle}
                    >
                      Select Tag
                    </button>
                  </span>
                </div>
                {isDropdownOpen && (
                  <div className="absolute z-50 mt-2 space-y-2 bg-white rounded-md shadow-lg">
                    {tags.map((tag) => (
                      <label
                        key={tag.id}
                        className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                      >
                      <div className='flex '>

                      <input
                          type="checkbox"
                          value={tag.id}
                          checked={selectedTags.includes(tag.id)}
                          onChange={() => handleTagSelection(tag.id)}
                          className="mr-2 form-checkbox"
                        />

                        {tag.name}
                      </div>
                      </label>
                    ))}
                  </div>
                )}
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

            <br />
            <Flowbite theme={{ theme: buttonTheme }}>
                <button type='submit' className={`mb-4 ${buttonTheme.button.color.primary}`}>Create Note</button>
            </Flowbite>
          </form>
          
        </Modal.Body>

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

export default CardModalNote;
