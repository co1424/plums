import Image from 'next/image'
import plumMain from "/public/images/plum.svg"
import signingoogle from "/public/images/signInGoogle.svg"
import signinapple from "/public/images/signInApple.svg"

function Home() {
  return (
    <main>
      <Image
       src={plumMain}
       alt="Picture of the author"
       height={400}
       width={400}
      priority={true}
      className='mx-auto mb-28'
      />

    <Image
    src={signingoogle}
       alt="Picture of the google sign in button"
      priority={true}
      className='mx-auto'
    />

    <Image
    src={signinapple}
       alt="Picture of the apple sign in button"
      priority={true}
      className='mx-auto'
    />

    </main>
  );
}

export default Home;
