import React from "react";

const PageWrapper = ({ children }) => {
  return (
    <main className="flex-1 min-h-screen p-6 bg-gradient-to-tr from-cyan-300 via-cyan-100 to-white text-white">
      {children}
    </main>
  );
};

export default PageWrapper;