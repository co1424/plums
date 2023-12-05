import React from 'react'
export interface image {
  id: string
  image: string
  description: string
}
interface prop{
  image: image
  twnd: string
  withDescription: boolean
}


const ImageRender = (prop: prop) => {
    const { id, image: content, description } = prop.image || {};
    
console.log("this is the image content at the imageRender level",prop.image)
console.log("this is the twnd content at the imageRender level",prop.image)

  return (
    <div id={id} >
        <a href="#">
            <img className={prop.twnd} loading='lazy' src={content} alt="an image inside a note" />
        </a>
        <br />
        {prop.withDescription && <p>{description}</p>}
        <br />
    </div>
  )
}

export default ImageRender