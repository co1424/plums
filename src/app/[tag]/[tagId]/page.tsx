'use client';
import React, { useEffect, useState } from 'react';
import Note from '@/app/components/Note';
import prisma from '@/app/data';
import { Spinner } from '@/app/components/spinner';
import apiUrl from '@/app/config'

interface NoteProps {
  params: {
    tag: string;
    tagId: string;
  };
}

interface NoteType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  images: {
    id: string;
    noteId: string;
    image: string;
    description: string | null;
  }[];
  files: {
    id: string;
    noteId: string;
    file: string;
    description: string | null;
  }[];
  urls: {
    id: string;
    noteId: string;
    url: string;
    description: string | null;
  }[];
}
interface   images {
  id: string;
  noteId: string;
  image: string;
  description: string | null;
}

const NotesByTopic = ({ params }: NoteProps) => {
  const { tagId } = params;
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchNotes = async () => {
    try {
      const result = await fetch(
        `${apiUrl}api/note?tagId=${encodeURIComponent(tagId)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (result.ok) {
        const notesByTag = await result.json();
        console.log('Notes by tag successfully fetched! tag/tagId/page');

        setNotes(notesByTag.result);
      }
    } catch (error) {
      console.error('Error fetching notes by tag tag/tagId/page', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [tagId]);

  const handleNoteDelete = async (noteId: string) => {
    try {
      // If the deletion was successful, update the state to trigger a re-render
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error('Error updating notes by tag:', error);
    }
  };
  
  const handleImageDelete = async (newImages: images[], noteId: string) => {
    try {
      // If the deletion was successful, update the state to trigger a re-render
      const previousNotes = notes.map((note) => {
        if (note.id === noteId) {
          note.images = newImages;
        }
        return note; // Ensure you return the note, whether modified or not
      });
      setNotes(previousNotes)      
    } catch (error) {
      console.error('Error updating notes by tag:', error);
    }
  };
  return (
    <div >
      {notes.length === 0 && (
        <div className="h-full flex items-center justify-center p-4">
          <div className="h-full flex items-center justify-center p-4">
            <Spinner size="lg" />
          </div>
          <p>Loading... There might not be any notes found under this tag.</p>
        </div>
      )}
      {notes.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center m-4 pb-8">
          {notes.map((note) => (
            <Note key={note.id} note={note} onDelete={handleNoteDelete} onImageDelete={handleImageDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesByTopic;
