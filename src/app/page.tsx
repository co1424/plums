import Image from 'next/image';
import plumMain from '/public/images/Plum.svg';
import signingoogle from '/public/images/signInGoogle.svg';
import signinapple from '/public/images/signInApple.svg';
import topMain from '/public/images/topMain.svg';
import bottomMain from '/public/images/bottomMain.svg';

function Home() {
  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 bg-white">
      <div className="z-10 w-full absolute -top-0">
        <Image src={topMain} alt="top background" fill={true} />
      </div>

      <Image
        src={plumMain}
        alt="Picture of the author"
        height={400}
        width={400}
        priority={true}
        id="main"
        className="mx-auto mt-28 mb-28 z-30 relative"
      />
    </main>
  );
}

export default Home;
