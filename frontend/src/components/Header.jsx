import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
      <header
          className="
        absolute top-0 left-0 w-full
        flex items-center justify-between
        px-6 py-4
        z-30
      "
      >
        {/* Navigation vers l'inventaire de l'utilisateur */}
        <h1
            onClick={() => navigate("/")}
            className="text-white font-bold text-4xl hover:text-orange-500 cursor-pointer"
        >
          What2Cook
        </h1>

        <nav className="flex gap-6 text-white font-medium">

          {/* Navigation vers l'inventaire de l'utilisateur */}
          <button
              onClick={() => navigate("/")}
              className="hover:text-orange-400 text-2xl"
          >
            Acceuil
          </button>

          {/* Navigation vers l'inventaire de l'utilisateur */}
          <button
              onClick={() => navigate("/inventaire")}
              className="hover:text-orange-400 text-2xl"
          >
            Inventaire
          </button>

          <a href="#" className="hover:text-orange-400 text-2xl">Recettes</a>
          <a href="#" className="hover:text-orange-400 text-2xl">A propos</a>
        </nav>
      </header>
  );
}
