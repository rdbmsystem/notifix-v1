function Tooltip({ description }) {
  return (
    <div>
      <span
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4
      px-2 py-2 text-xs text-white bg-gray-800 rounded-lg shadow opacity-0 
      group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none"
      >
        {description}
      </span>
    </div>
  );
}

export default Tooltip;
