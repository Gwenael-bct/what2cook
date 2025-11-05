import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
      <header
          className="bg-[#3A3A3A] bg-opacity-90
        absolute top-0 left-0 w-full
        flex items-center justify-between
        px-4 md:px-8 lg:px-12 py-4
        z-30
      "
      >
        {/* Menu hamburger - Mobile uniquement */}
        <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </button>

        {/* Logo */}
        <h1
            onClick={() => navigate("/")}
            className="text-white font-bold text-xl md:text-3xl lg:text-4xl hover:text-orange-500 cursor-pointer"
        >
          What2Cook
        </h1>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-white font-medium items-center">
          <button
              onClick={() => navigate("/")}
              className="hover:text-orange-400 text-base lg:text-lg transition-colors"
          >
            Acceuil
          </button>
          <button
              onClick={() => navigate("/recettes")}
              className="hover:text-orange-400 text-base lg:text-lg transition-colors"
          >
            Recettes
          </button>
          <button
              onClick={() => navigate("/recentes-prefere")}
              className="hover:text-orange-400 text-base lg:text-lg transition-colors"
          >
            Recettes préférées
          </button>
          <button
              onClick={() => navigate("/inventaire")}
              className="hover:text-orange-400"
          >
            <PersonOutlineIcon fontSize="medium" />
          </button>
        </nav>

        {/* Icône panier - Mobile */}
        <button
            onClick={() => navigate("/inventaire")}
            className="md:hidden text-white hover:text-orange-400"
        >
          <PersonOutlineIcon fontSize="medium" />
        </button>

        {/* Menu mobile déroulant */}
        {menuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#3A3A3A] bg-opacity-95 shadow-lg">
              <nav className="flex flex-col text-white font-medium">
                <button
                    onClick={() => {
                      navigate("/");
                      setMenuOpen(false);
                    }}
                    className="hover:bg-orange-500 text-left px-6 py-4 border-b border-white/10 transition-colors"
                >
                  Accueil
                </button>
                <button
                    onClick={() => {
                      navigate("/recettes");
                      setMenuOpen(false);
                    }}
                    className="hover:bg-orange-500 text-left px-6 py-4 border-b border-white/10 transition-colors"
                >
                  Reccetes
                </button>
                <button
                    onClick={() => {
                      navigate("/recentes-prefere");
                      setMenuOpen(false);
                    }}
                    className="hover:bg-orange-500 text-left px-6 py-4 transition-colors"
                >
                  Recettes préférées
                </button>
              </nav>
            </div>
        )}
      </header>
  );
}
