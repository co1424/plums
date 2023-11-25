import React from 'react'

const FileRender = ({ file }: any) => {
    const { id, file: content, description } = file || {};

  return (

    // I can get the name of the file and display it, I would like to show a preview and 
    // it's name and if you click it. it opens in a new tab.
    <div id={id} >
        <a target='_blank' href={content}>Name of the file that I don't know yet how to retrieve</a>
        <br />
        {description && <p>{description}</p>}
        <br />
    </div>
  )
}

export default FileRender