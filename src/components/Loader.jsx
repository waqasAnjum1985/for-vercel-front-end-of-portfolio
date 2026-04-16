import React from "react";

function Loader() {
  return (
    <div className="h-screen flex items-center justify-center fixed inset-0 bg-primary z-[1050]">
      <div className="flex md:gap-6 gap-3 md:text-6xl text-3xl font-semibold">
        <h1 className="text-secondary d">Dr.</h1>
        <h1 className="text-white w">W</h1>
        <h1 className="text-tertary a">A</h1>
      </div>
    </div>
  );
}

export default Loader;
