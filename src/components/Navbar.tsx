import {
  Link,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { useState, type FormEvent } from "react";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import logoImage from "../assets/Logo.svg";
import CloseIcon from "../assets/Close.svg";

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const queryFromUrl = searchParams.get("q") || "";

  useEffect(() => {
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [queryFromUrl]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const showMobileSearch = isSearchOpen || location.pathname === "/search";

  const handleNavClick = (path: string) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate("/");
  };

  return (
    <header>
      <nav
        className={`fixed top-0 left-0 md:px-30 right-0 h-16 md:h-[90px] z-50 flex justify-between items-center ${
          isScrolled
            ? "bg-black/40 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="md:flex w-full justify-between hidden">
          <div className="flex items-center gap-20">
            <Link to="/" className="flex cursor-pointer items-center">
              <img src={logoImage} alt="logo" />
            </Link>
            <div className="flex gap-12">
              <button
                onClick={() => handleNavClick("/")}
                className="text-white cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick("/favorites")}
                className="text-white cursor-pointer"
              >
                Favorites
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSearch}
            className="relative items-center h-full bg-[#0A0D1299]/60 backdrop-blur-2xl px-4 gap-2 py-2 border-neutral-800 rounded-xl flex w-full md:w-[243px] focus:w-full focus:bg-black transition-all max-w-md border"
          >
            <button type="submit" className="text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search Movies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-none w-full"
            />
          </form>
        </nav>

        <div className="md:hidden w-full flex justify-between">
          <Link to="/" className="flex items-center pl-4">
            <img src={logoImage} alt="logo" />
          </Link>

          <div className="flex items-center gap-6 mr-4">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="bg-transparent! p-0!"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-transparent!"
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12"></line>
                  <line x1="4" x2="20" y1="6" y2="6"></line>
                  <line x1="4" x2="20" y1="18" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed top-0 left-0 right-0 pt-21 flex flex-col text-left gap-4 bottom-0 bg-black p-4 z-49">
          <button
            onClick={() => handleNavClick("/")}
            className="text-white text-left"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("/favorites")}
            className="text-white text-left"
          >
            Favorites
          </button>
        </div>
      )}

      {showMobileSearch && (
        <div className="fixed md:hidden top-0 left-0 right-0 z-99 flex text-left gap-4 bg-black p-4 z-49">
          <button onClick={closeSearch}>
            <ArrowLeft />
          </button>
          <form
            onSubmit={handleSearch}
            className="relative items-center px-4 gap-2 py-2 border-neutral-800 rounded-xl flex w-full max-w-md border"
          >
            <button type="submit" className="text-neutral-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search Movies"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="border-none outline-none w-full"
            />
            {searchQuery && <img src={CloseIcon} alt="Clear search" />}
          </form>
        </div>
      )}
    </header>
  );
}
