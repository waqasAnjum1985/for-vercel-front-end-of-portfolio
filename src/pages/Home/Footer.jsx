import React from "react";

function Footer() {
  return (
    <div className="py-2">
      <div className="h-[1px] w-full bg-gray-700 -mb-8 "></div>
      <div className="flex items-center justify-center flex-col mt-10  opacity-70">
        <h1 className="text-white">Designed & Developed By</h1>
        <h1 className="text-white">
          <span className="text-secondary  text-bold text-2xl">
            WAQAS ANJUM
          </span>
        </h1>
      </div>
    </div>
  );
}

export default Footer;
