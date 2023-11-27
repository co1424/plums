// import { Flowbite } from 'flowbite-react';
// import React, { useEffect, useState } from 'react';
// import { buttonTheme } from './themes';

// export interface tagResponse {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   authorId: string;
// }

// const TagList = () => {
//   const [tags, setTags] = useState<tagResponse[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const result = await fetch('http://localhost:3000/api/tag', {
//         cache: 'no-store',
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const tagsData: tagResponse[] = await result.json();
//       setTags(tagsData);
//     };
//     fetchData();
//   }, []); // Run once when the component mounts
  
//   // I don't know why but when I put this console.log it gets called 6 times!
//   // console.log("I'm tags from the taglis component",tags)
//   return (
//     <Flowbite theme={{ theme: buttonTheme }}>
//       {tags.map((tag: tagResponse) => (

//         // this means that I need a [topic] file so the url says the topic I'm in
//         <a key={tag.id} href={`/${tag.name}/${tag.id}`}>
//           <button className={`mb-4 ${buttonTheme.button.color.primary}`}>
//             {tag.name}
//           </button>
//         </a>
//       ))}
//     </Flowbite>
//   );
// };

// export default TagList;
