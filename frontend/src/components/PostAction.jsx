export default function PostAction({ icon, text, onClick }) {
  return (
    <button
      className="flex items-center px-8 hover:bg-base-100 rounded-md py-1 w-full justify-center"
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      <span className="hidden sm:inline">{text}</span>
    </button>
  );
}
