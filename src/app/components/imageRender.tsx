import React from 'react'

const ImageRender = ({ image }: any) => {
    const { id, image: content, description } = image || {};
console.log("this is the image content at the imageRender level",image)
  return (
    <div id={id}>
        <a href="#">
            <img loading='lazy' src={content} alt="an image inside a note" />
        </a>
        <br />
        {description && <p>{description}</p>}
        <br />
    </div>
  )
}

export default ImageRender