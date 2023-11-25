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
console.log("I'm params",params)

const {tagId} = params;


const notes = await prisma.note.findMany({
  where: {
    tags: {
      some: {
        id: tagId,
      },
    },
  },
});
  

console.log("I'm notes from params", notes)

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





