import { Flowbite } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { buttonTheme } from './themes';

export interface tagResponse {
  _id: string;
  name: string;
  description: string;
  image: string;
  authorId: string;
}

const TagList = () => {
  const [tags, setTags] = useState<tagResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/api/tag', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const tagsData: tagResponse[] = await result.json();
      setTags(tagsData);
    };

    fetchData();
  }, []); // Run once when the component mounts

  return (
    <Flowbite theme={{ theme: buttonTheme }}>
      {tags.map((tag: tagResponse) => (
        <a key={tag._id} href={'/topic'}>
          <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
            {tag.name}
          </button>
        </a>
      ))}
    </Flowbite>
  );
};

export default TagList;
