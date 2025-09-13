import React from "react";

const Header = () => {
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
      <button onClick={() => alert("Profile Page")} className="focus:outline-none">
        ProPic
      </button>
    </header>
  );
};

export default Header;