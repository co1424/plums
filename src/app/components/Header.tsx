"use client";
import exp from "constants";
import { useScrollTop } from "./use-scroll-top";
import Link from "next/link";

const purpleBackgroundColor = {
  backgroundColor: 'rgba(250, 245, 255, 1)',
};



function Header() {

  const scrolled = useScrollTop();
  const headerStyle = `flex justify-between items-center px-11 py-5 min-h-fit${
    scrolled ? ' border-b shadow' : ''
  }`;

  console.log(scrolled)
  return (
<header className="sticky top-0 bg-white z-50" >
    <nav>
        <ul className={headerStyle}>
            <li><Link href="welcome" className="pi pi-home" style={{ fontSize: '2rem', padding: '10px' }}></Link></li>


            <li>
              <div className="rounded-full p-2" style={purpleBackgroundColor}>
                <img src="../images/plum_profile.svg" alt="Plum-Image" className="w-20 md:w-120" />
              </div>  
            </li>

        </ul>
    </nav>
</header>
  );
}

export default Header;