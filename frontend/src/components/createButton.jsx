export function CreateButton({ icon: Icon, text }) {
  return (
      <div className="group flex items-center bg-white/10 rounded-xl px-4 py-2 hover:shadow-2xl hover:bg-orange-500
       transition duration-300 ease-in-out">
        <Icon className="text-gray-400 mr-2 transition group-hover:text-white group-hover:scale-110" />
        <button
            className="text-gray-100 group-hover:text-white font-medium bg-transparent p-2 outline-none"
            type="button"
        >
          {text}
        </button>
      </div>
  );
}
