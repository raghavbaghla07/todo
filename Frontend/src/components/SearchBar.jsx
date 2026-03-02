import { useState, useEffect } from "react";
import React from "react";

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

        <button className="absolute right-3 top-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 opacity-70"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
