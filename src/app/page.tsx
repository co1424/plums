import Image from 'next/image'
import plumMain from "/public/images/plumMain.png"

function Home() {
  return (
    <main>

      <h1 className="m-5 text-blue-200">Hello World!</h1>
      <Image
       src={plumMain}
       alt="Picture of the author"
       height={400}
       width={400}
      priority={true}
      className='flex items-center justify-center'
      />
    </main>
  );
}

export default Home;
