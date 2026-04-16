import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle.jsx";

import { useSelector } from "react-redux";

export default function Experiences() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { experiences } = portfolioData;

  return (
    <div>
      <SectionTitle title="Experience" />
      <div className="flex py-10 gap-20 flex-col md:flex-row">
        <div className="flex md:flex-col gap-10 border-l-2 border-[#125e4c82] md:w-1/3 w-full overflow-x-scroll ">
          {experiences.map((experience, index) => (
            <div
              key={experience._id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-2xl px-5 ${selectedItemIndex === index ? "text-tertary border-tertary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3" : "text-white"}`}
              >
                {experience.period}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex pl-5 flex-col gap-5">
          <h1 className="text-secondary text-xl">
            {experiences[selectedItemIndex].title}
          </h1>
          <h1 className="text-tertary text-xl">
            {experiences[selectedItemIndex].company}
          </h1>
          <p className="text-white text-xl">
            {experiences[selectedItemIndex].description}
          </p>
        </div>
      </div>
    </div>
  );
}
