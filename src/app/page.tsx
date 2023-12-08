import Image from 'next/image';
import plumMain from '/public/images/Plum.svg';
import topMain from '/public/images/topMain.svg';

function Home() {
  return (
    <main className="absolute top-0 left-0 right-0 bottom-0 bg-white flex items-center justify-center flex-col text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Plums</h1>
      <h2 className="text-lg text-gray-600 mb-8">Please log in to continue</h2>

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
        className="mx-auto mt-10 mb-10 z-30 relative"
      />

<button className="p-3 bg-purple-400 text-black rounded-md text-lg font-bold hover:bg-purple-400 transition-colors duration-300 w-64">
        <a href="/api/auth/login">Login</a>
      </button>
    </main>
  );
}

export default Home;
