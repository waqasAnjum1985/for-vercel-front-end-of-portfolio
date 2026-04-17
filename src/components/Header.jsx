import React from "react";

function Header() {
  return (
    <div className="sticky top-0 md:mb-10  p-5  bg-primary flex justify-between">
      <h1 className="text-secondary ml-1 text-4xl   font-semibold">Dr.</h1>
      <h1 className="text-white   text-4xl  font-semibold">W</h1>
      <h1 className="text-tertary mr-10   text-4xl  font-semibold">A</h1>
    </div>
  );
}

export default Header;
