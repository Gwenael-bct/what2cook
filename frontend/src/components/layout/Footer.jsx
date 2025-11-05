import { useNavigate } from "react-router-dom";
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer() {
  const navigate = useNavigate();

  return (
      <footer className="bg-neutral-900 text-white py-6 md:py-8 -mt-6 md:-mt-8">
        <div className="container mx-auto px-4 md:px-8">
          {/* Desktop - une seule ligne */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex gap-6 text-sm">
              <button
                  onClick={() => navigate("/apropos")}
                  className="hover:text-orange-400 transition-colors text-xl"
              >
                À propos
              </button>
              <button
                  onClick={() => navigate("/contact")}
                  className="hover:text-orange-400 transition-colors text-xl"
              >
                Contact
              </button>
              <button
                  onClick={() => navigate("/mentions-legales")}
                  className="hover:text-orange-400 transition-colors text-xl"
              >
                Mentions légales
              </button>
              <button
                  onClick={() => navigate("/confidentialite")}
                  className="hover:text-orange-400 transition-colors text-xl"
              >
                Confidentialité
              </button>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex gap-8">
              <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-400 p-2 rounded-full hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              >
                <TwitterIcon className="text-white" fontSize="large" />
              </a>
              <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-400 p-2 rounded-full hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"
              >
                <InstagramIcon className="text-white" fontSize="large" />
              </a>
            </div>
          </div>

          {/* Mobile - version centrée et compacte */}
          {/*<div className="md:hidden flex flex-col items-center gap-4 text-xs">*/}
          {/*  <div className="flex flex-wrap justify-center gap-3">*/}
          {/*    <button*/}
          {/*        onClick={() => navigate("/apropos")}*/}
          {/*        className="hover:text-orange-400 transition-colors"*/}
          {/*    >*/}
          {/*      À propos*/}
          {/*    </button>*/}
          {/*    <span className="text-gray-500">|</span>*/}
          {/*    <button*/}
          {/*        onClick={() => navigate("/contact")}*/}
          {/*        className="hover:text-orange-400 transition-colors"*/}
          {/*    >*/}
          {/*      Contact*/}
          {/*    </button>*/}
          {/*    <span className="text-gray-500">|</span>*/}
          {/*    <button*/}
          {/*        onClick={() => navigate("/mentions-legales")}*/}
          {/*        className="hover:text-orange-400 transition-colors"*/}
          {/*    >*/}
          {/*      Mentions légales*/}
          {/*    </button>*/}
          {/*    <span className="text-gray-500">|</span>*/}
          {/*    <button*/}
          {/*        onClick={() => navigate("/confidentialite")}*/}
          {/*        className="hover:text-orange-400 transition-colors"*/}
          {/*    >*/}
          {/*      Confidentialité*/}
          {/*    </button>*/}
          {/*  </div>*/}

          {/*  /!* Réseaux sociaux *!/*/}
          {/*  <div className="flex gap-3">*/}
          {/*    <a*/}
          {/*        href="https://twitter.com"*/}
          {/*        target="_blank"*/}
          {/*        rel="noopener noreferrer"*/}
          {/*        className="bg-teal-400 p-2 rounded-full hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"*/}
          {/*    >*/}
          {/*      <TwitterIcon className="text-white" fontSize="small" />*/}
          {/*    </a>*/}
          {/*    <a*/}
          {/*        href="https://instagram.com"*/}
          {/*        target="_blank"*/}
          {/*        rel="noopener noreferrer"*/}
          {/*        className="bg-teal-400 p-2 rounded-full hover:bg-teal-300 transition-all shadow-[0_0_15px_rgba(34,211,238,0.6)] hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]"*/}
          {/*    >*/}
          {/*      <InstagramIcon className="text-white" fontSize="small" />*/}
          {/*    </a>*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </footer>
  );
}
