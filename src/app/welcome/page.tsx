'use client';
import React from 'react';
import {Flowbite, Button} from 'flowbite-react';
import {buttonTheme} from '../../components/themes'

function Welcome() {
  return (
    <main className="flex flex-col items-center justify-center ">
      <br />
      <br />
      <h1 className='text-xl font-bold'>Welcome!</h1>
      <br />
      <Flowbite theme={{ theme: buttonTheme }}>
      <button className={`mb-4 ${buttonTheme.button.color.primary}`}>Add new topic</button>
      <br />
      <br />
      <br />
      <br />
      </Flowbite>
      <h2 className='text-xl font-bold'>Your existing topics:</h2>
      <br />
      <Flowbite theme={{ theme: buttonTheme }}>
      <button className={`mb-4 ${buttonTheme.button.color.primary}`}>TypeScript</button>
      </Flowbite>
      <Flowbite theme={{ theme: buttonTheme }}>
      <button className={`mb-4 ${buttonTheme.button.color.primary}`}>TailwindCSS</button>
      </Flowbite>
      <Flowbite theme={{ theme: buttonTheme }} className='font-bold'>
      <button className={`mb-4 ${buttonTheme.button.color.primary}`}>C#</button>
      </Flowbite>

    </main>
  );
}

export default Welcome;
