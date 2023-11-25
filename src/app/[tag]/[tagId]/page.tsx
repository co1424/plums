// import React from 'react';
// import Note from '@/app/components/Note';
// import prisma from "@/app/data";

// interface NoteProps {
//     params: {
//         tag: string
//         tagId: string
//     }
// }

// // aun no he visto si esto va a funcionar estoy debatiendo si deberia hacerlo asi o si 
// // deberia mejor empezar por crear una nota primero
// const NotesByTopic = async () => {

// const notes = await prisma.note.findMany()

// console.log("I'm notes from params", notes)

//   return (
//     <div className=' h-screen  overflow-y-auto'>
//       <div className='flex flex-wrap gap-4 justify-center  mx-4'>

//         {notes.map((note) => {
//           return (<Note key={note.id} note={note} />);
//         })}
//       </div>
//     </div>
//   );
// };

// export default NotesByTopic;


// this is the error message that I'm getting I think that I added the tagIds wrong 
// I need to find out what is the right way to do it 

// Inconsistent column data: Failed to convert '{ "id": ObjectId("655e4fc5d52ace573e56cd99") }' to 'String' for the field 'tagIds'.
//     at async NotesByTopic (./src/app/[tag]/[tagId]/page.tsx:18:19)
// digest: "1270759421"


// attempt #2
// Inconsistent column data: Failed to convert '{ "id": "655e4fc5d52ace573e56cd99" }' to 'String' for the field 'tagIds'.
//     at async NotesByTopic (./src/app/[tag]/[tagId]/page.tsx:18:19)
// digest: "667337437"



import React from 'react';
import Note from '@/app/components/Note';
import prisma from "@/app/data";
const ObjectId = require('mongodb').ObjectId;

interface NoteProps {
    params: {
        tag: string
        tagId: string
    }
}

const NotesByTopic = async ({ params }: NoteProps) => {
console.log("I'm params",params)

const {tagId} = params;

const tagIdObject = new ObjectId(tagId);

const notes = await prisma.note.findMany({
  where: {
    tags: {
      some: {
        id: tagIdObject.toHexString(),
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





