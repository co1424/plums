"use client";
import React, { useEffect, useState } from 'react';
import Note from '@/app/components/Note';
import prisma from "@/app/data";

interface NoteProps {
  params: {
    tag: string
    tagId: string
  }
}

interface NoteType {
  id: string;
  title: string;
  content: string;
  authorId: string;
  images: { id: string; noteId: string; image: string; description: string | null }[];
  files: { id: string; noteId: string; file: string; description: string | null }[];
  urls: { id: string; noteId: string; url: string; description: string | null }[];
}

const NotesByTopic = ({ params }: NoteProps) => {
  const { tagId } = params;
  const [notes, setNotes] = useState<NoteType[]>([]);

  const fetchNotes = async () => {
    try {
      const result = await fetch(`http://localhost:3000/api/note?tagId=${encodeURIComponent(tagId)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (result.ok) {
        const notesByTag = await result.json()
        console.log("Notes by tag successfully fetched! tag/tagId/page")

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

  console.log("I'm the result from the search of notes by tag at tag/tagId/page", notes)

  return (
    <div className=' h-screen  overflow-y-auto'>
      <div className='flex flex-wrap gap-4 justify-center  mx-4'>
        {notes.map((note) => {
          return <Note key={note.id} note={note} onDelete={handleNoteDelete} />
        })}
      </div>
    </div>
  );
};

export default NotesByTopic;
