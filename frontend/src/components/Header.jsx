export default function Header() {
  return (
      <header
          className="
        absolute top-0 left-0 w-full
        flex items-center justify-between
        px-6 py-4
        z-20
      "
      >
        <h1 className="text-white text-2xl font-bold hover:text-orange-500">What2Cook</h1>

        <nav className="flex gap-6 text-white font-medium">
          <a href="#" className="hover:text-orange-400">Home</a>
          <a href="#" className="hover:text-orange-400">Recipes</a>
          <a href="#" className="hover:text-orange-400">About</a>
        </nav>
      </header>
  );
}
