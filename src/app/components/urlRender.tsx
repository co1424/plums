import React from 'react'

const UrlRender = ({ url }: any) => {
    const { id, url: content, description } = url || {};

  return (
    <div id={id} >
        <a target='_blank' href={content}>{content}</a>
        <br />
        {description && <p>{description}</p>}
        <br />
    </div>
  )
}

export default UrlRender