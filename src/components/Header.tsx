import exp from "constants";


const purpleBackgroundColor = {
  backgroundColor: 'rgba(250, 245, 255, 1)',
};



function Header() {
  return (
<header>
    <nav>
        <ul className="flex justify-between items-center">
            <li><a href="#" className="pi pi-home" style={{ fontSize: '2rem', position: 'absolute', top: '0', left: '0', padding: '10px' }}></a></li>
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