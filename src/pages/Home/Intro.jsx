import React from "react";
import { useSelector } from "react-redux";

function Intro() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { intro } = portfolioData;
  const { wellcomeText, firstName, lastName, caption, description } = intro;
  return (
    <div
      className="h-[80vh] md:mt-40 bg-primary flex flex-col items-start justify-center gap-8 py-10 
    "
    >
      <h1 className="text-white">{wellcomeText || ""}</h1>

      <h1 className="md:text-7xl text-3xl font-semibold text-secondary">
        {firstName || ""} {lastName || ""}
      </h1>
      <h1 className="md:text-7xl text-3xl font-semibold text-white">
        {caption || ""}
      </h1>
      <p className="text-white w-2/3">{description}</p>
      <button
        className="cursor-pointer  border-2 border-tertary text-tertary px-10 py-3 rounded"
        onClick={() => {
          window.location.href = "/admin-login";
        }}
      >
        Get Started
      </button>
    </div>
  );
}

export default Intro;
