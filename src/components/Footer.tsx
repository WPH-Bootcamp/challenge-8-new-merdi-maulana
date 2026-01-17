import { Link } from "react-router-dom";
import logoImage from "../assets/Logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black/50 border-t border-neutral-800 gap-2 mt-10">
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:justify-between md:flex-row items-center justify-start items-start gap-2">
          <Link to="/" className="flex items-center w-23 cursor-pointer">
            <img src={logoImage} alt="logo" />
          </Link>

          <p className="text-gray-600 text-xs md:text-[16px]">
            Copyright ©{currentYear} Movie Explorer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
