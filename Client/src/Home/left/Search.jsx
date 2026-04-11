import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Search = ({ search, setSearch }) => {
  return (
    <form className="mt-4" onSubmit={(e) => e.preventDefault()}>
      <label className="relative block">
        <span className="sr-only">Search chat</span>
        <input
          type="text"
          placeholder="Search chat..."
          className="w-full rounded-xl border border-white/25 bg-transparent px-3 py-2.5 pr-11 text-sm text-white placeholder:text-white/75 outline-none ring-0 focus:border-white/40"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-white/20 p-1.5 text-white transition hover:bg-white/30"
          aria-label="Search"
        >
          <IoSearch className="text-base" />
        </button>
      </label>
    </form>
  );
};

export default Search;
