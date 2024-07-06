import React from "react";

const navbar = () => {
  return (
    <div className="bg-gray-900">
      <nav className="flex py-2 text-white justify-between gap-4 container mx-auto px-2 lg:px-40">
      <div className="font-bold text-2xl">
        <span className="text-green-800">&lt;</span>Pass
        <span className="text-green-800">Op/&gt;</span>
      </div>
      {/* <ul className="flex gap-3 justify-center">
        <li>
          <a className="hover:text-gray-800" href="#">
            Home
          </a>
        </li>
        <li>
          <a className="hover:text-gray-800" href="#">
            Contact
          </a>
        </li>
        <li>
          <a className="hover:text-gray-800" href="#">
            About
          </a>
        </li>
      </ul> */}
      <button className="font-bold flex gap-2 px-2 bg-green-500 rounded-md items-center">
        <i className="fa-brands fa-github"></i>
        <span className="text-nowrap">GitHub</span>
      </button>
    </nav>
    </div>
  );
};

export default navbar;
