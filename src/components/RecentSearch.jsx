import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const RecentSearch = ({
  recentHistory,
  setRecentHistory,
  setSelectedHistory,
}) => {
  const clearHistory = () => {
    localStorage.clear();
    setRecentHistory([]);
  };
  return (
    <>
      <div className="col-span-1 dark:bg-zinc-800 bg-red-100 pt-3">
        <div className="flex my-5 justify-center items-center gap-2">
          <h1 className="dark:text-white text-zinc-800 lg:text-2xl ">
            Recent Searches
          </h1>
          <RiDeleteBin6Line
            onClick={clearHistory}
            className="dark:text-white text-zinc-800 lg:text-2xl cursor-pointer"
          />
        </div>
        <ul className="overflow-auto text-left ">
          {recentHistory &&
            recentHistory.map((item, index) => (
              <li
                onClick={() => setSelectedHistory(item)}
                key={index}
                className="px-10 dark:text-zinc-400 text-zinc-700 cursor-pointer truncate dark:hover:bg-zinc-700 dark:hover:text-zinc-200 hover:bg-red-200 hover:text-zinc-800 p-1"
              >
                {item}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default RecentSearch;
