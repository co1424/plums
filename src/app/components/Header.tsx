'use client';
import exp from 'constants';
import { useScrollTop } from './use-scroll-top';
import Link from 'next/link';
import Image from 'next/image';
import plumsTitle from '../../../public/images/plums-title.png'
import plumsProfile from '../../../public/images/plum_profile.svg'

const purpleBackgroundColor = {
  backgroundColor: 'rgba(250, 245, 255, 1)',
};

function Header() {
  const scrolled = useScrollTop();
  const headerStyle = `flex justify-between items-center px-11 py-5 min-h-fit${
    scrolled ? ' border-b shadow' : ''
  }`;

  console.log(scrolled);
  return (
    <header className="sticky top-0 bg-white z-50">
      <nav>
        <ul
          className={
            headerStyle + ' flex justify-between items-center p-4 bg-white'
          }
        >
          {/* Home button on the left */}
          <li>
            <Link
              href="welcome"
              className="pi pi-home text-black"
              style={{ fontSize: '2rem', padding: '10px' }}
            ></Link>
          </li>

          {/* Plums title and image */}
          <li className="flex items-center">
            {/* Plums title (centered on small screens) */}
            <div className="sm:inline-block rounded-full p-2">
              <div className="w-80 md:w-40">
                <Image
                  src={plumsTitle}
                  alt="title"
                  fill={true}
                />
              </div>
            </div>

            {/* Plum image on the right */}
            <div className="w-12 md:w-120 ml-auto">
              <Image
                src={plumsProfile}
                alt="Plum-Image"
                fill={true}
              />
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
