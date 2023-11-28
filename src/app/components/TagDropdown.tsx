import { Flowbite } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { buttonTheme } from './themes';



export interface tagResponse {
  id: string;
  name: string;
}

const TagDropdown = () => {
  const [tags, setTags] = useState<tagResponse[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:3000/api/tag', {
        cache: 'no-store',
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

  const handleTagSelection = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  
  return (
    <div className="relative inline-block text-left" >
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            id="options-menu"
            onClick={handleDropdownToggle}
          >
            Select Tag
          </button>
        </span>
      </div>
      {isDropdownOpen && (
        <div className="absolute z-50 mt-2 space-y-2 bg-white rounded-md shadow-lg">
          {tags.map((tag) => (
            <label
              key={tag.id}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
            >
            <div className='flex '>
            
            <input
                type="checkbox"
                value={tag.id}
                checked={selectedTags.includes(tag.id)}
                onChange={() => handleTagSelection(tag.id)}
                className="mr-2 form-checkbox"
              />
            
              {tag.name}
            </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagDropdown;
