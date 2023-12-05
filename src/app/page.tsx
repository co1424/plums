import Image from 'next/image'
import plumMain from "/public/images/Plum.svg"
import signingoogle from "/public/images/signInGoogle.svg"
import signinapple from "/public/images/signInApple.svg"
import topMain from "/public/images/topMain.svg"
import bottomMain from "/public/images/bottomMain.svg"

function Home() {
  return (
    <main className='absolute top-0 left-0 right-0 bottom-0 bg-white'>
      <Image
      src={topMain}
      alt="top background"
      className='z-10 w-full absolute -top-0'
      />

      <Image
       src={plumMain}
       alt="Picture of the author"
       height={400}
       width={400}
      priority={true}
      id='main'
      className='mx-auto mt-28 mb-28 z-30 relative'
      />

    <Image
    src={signingoogle}
       alt="Picture of the google sign in button"
      priority={true}
      className='mx-auto z-30 relative'
    />

    <Image
    src={signinapple}
       alt="Picture of the apple sign in button"
      priority={true}
      className='mx-auto z-30 relative'
    />

    <Image
      src={bottomMain}
      alt="bottom background"
      className='z-20 w-full absolute -bottom-0'
    />

    </main>
  );
}

export default Home;
