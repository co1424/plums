import Link from 'next/link';
import React from 'react'

const Note = ({ note }: any) => {
    const { id, title, note_content } = note || {};
  return (
    <div className="border-2 rounded-lg max-w-xs min-w-80 p-3 ">
        <Link href={`/notes/${id}`}>
        <div >
            <h2 className='font-bold'>{title}</h2>
            <p>{note_content}</p>
        </div>
        </Link>
    </div>
  )
}

export default Note