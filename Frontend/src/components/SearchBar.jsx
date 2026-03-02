import { useState, useEffect } from "react";

const SearchBar = ({ setSearch }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchText); // send value to parent
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, setSearch]);

  return (
    <div className="my-6 mx-auto w-1/2">
      <div className="relative w-full">
        <input
          type="text"
          className="input input-bordered w-full pr-10 focus:outline-none bg-base-200"
          placeholder="Search your todo....."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
