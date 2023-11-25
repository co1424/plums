import React from 'react';
import Note from '@/app/components/Note';
import prisma from "@/app/data";

interface NoteProps {
    params: {
        tag: string
        tagId: string
    }
}

const NotesByTopic = async ({ params }: NoteProps) => {
console.log("I'm params passed to the findMany function at tag/id",params)

const {tagId} = params;

const notes = await prisma.note.findMany({
  where: {
    tagIds: {
      has: tagId,
    },
  },
  include: {
    images: true,
    files: true,
    urls: true,
  }
});
  

console.log("I'm the result from the search of notes by tag", notes)

  return (
    <div className=' h-screen  overflow-y-auto'>
      <div className='flex flex-wrap gap-4 justify-center  mx-4'>

        {notes.map((note) => {
          return (<Note key={note.id} note={note} />);
        })}
      </div>
    </div>
  );
};

export default NotesByTopic;
