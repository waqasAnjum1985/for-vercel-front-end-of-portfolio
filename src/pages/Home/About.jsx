import React from "react";
import SectionTitle from "../../components/SectionTitle.jsx";

import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function About() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { lottieURL, description1, description2, skills } = about;

  return (
    <div>
      <SectionTitle title="About Me" />
      <div className="flex md:flex-row flex-col  w-full items-center ">
        <div className="h-[70vh]  w-full">
          <DotLottieReact
            src={lottieURL}
            autoplay="true"
            loop="true"
            speed={1}
            mode="forward"
          />
        </div>
        <div className="flex flex-col gap-5 md:w-1/2 w-full">
          <p className="text-white">{description1 || ""}</p>
          <p className="text-white">{description2 || ""}</p>
        </div>
      </div>
      <div className="py-5">
        <h1 className="text-tertary text-xl">
          Here are few technologies, I have been working with recently
        </h1>
        <div className="flex flex-wrap gap-10 mt-5">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="border border-tertary px-10 py-3 rounded "
            >
              <h1 className="text-tertary">{skill}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
