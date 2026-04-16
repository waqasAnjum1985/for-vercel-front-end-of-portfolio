import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle.jsx";
import { useSelector } from "react-redux";
function Projects() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { projects } = portfolioData;
  return (
    <div>
      <SectionTitle title="Projects+" />
      <div className="flex py-10 gap-20 flex-col md:flex-row">
        <div className="flex md:flex-col gap-10 border-l-2 border-[#125e4c82] md:w-1/3 w-full overflow-x-scroll ">
          {projects.map((project, index) => (
            <div
              key={project._id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-2xl px-5 ${selectedItemIndex === index ? "text-tertary border-tertary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3" : "text-white"}`}
              >
                {project.title}
              </h1>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-10 md:flex-row flex-col">
          <img
            src={projects[selectedItemIndex].image}
            alt="empty"
            className="h-60 w-72 "
          />
          <div className="flex flex-col gap-5  ">
            <h1 className="text-secondary text-xl">
              {projects[selectedItemIndex].title}
            </h1>
            <p className="text-white text-xl">
              {projects[selectedItemIndex].description}
            </p>
            <p className="text-white underline  text-xl break-words">
              <a
                href={projects[selectedItemIndex].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Githubb link / Demo link
              </a>
            </p>
            <p className="text-white text-xl">
              technologies used :{" "}
              {projects[selectedItemIndex].technologies?.join(" , ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
