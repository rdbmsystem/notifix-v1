import { IoSearch } from "react-icons/io5";
import { InputBase } from "@mui/material";

const SearchBar = ({
  containerClass = "",
  inputClass = "",
  iconClass = "",
}) => {
  return (
    <div className={`relative hover:bg-white/25 w-full ${containerClass}`}>
      <div
        className={`absolute flex items-center z-10 justify-center px-3 h-full ${iconClass}`}
      >
        <IoSearch />
      </div>
      <div
        className={`text-inherit text-sm rounded-full bg-base-200 px-4 pl-[calc(1em+1rem)] w-full transition-width ${inputClass}`}
      >
        <InputBase className="px-2" placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchBar;
