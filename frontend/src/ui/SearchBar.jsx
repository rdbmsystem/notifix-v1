import { IoSearch } from "react-icons/io5";
import { InputBase } from "@mui/material";

const SearchBar = () => {
  return (
    <div className=" relative hover:bg-white/25 w-full">
      <div className="absolute flex items-center z-10 justify-center px-2 h-full ">
        <IoSearch />
      </div>
      <div className="text-inherit text-sm rounded-full bg-base-200 px-4 pl-[calc(1em+1rem)] py-1  w-full transition-width ">
        <InputBase placeholder="Search" />
      </div>
    </div>
  );
};

export default SearchBar;
