import React, { useState } from "react";
import SectionTitle from "../../components/SectionTitle.jsx";
import { useSelector } from "react-redux";
function Courses() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { courses } = portfolioData;
  return (
    <div>
      <SectionTitle title="Courses" />
      <div className="flex py-10 gap-20 flex-col md:flex-row">
        <div className="flex md:flex-col gap-10 border-l-2 border-[#125e4c82] md:w-1/3 w-full overflow-x-scroll ">
          {courses.map((course, index) => (
            <div
              key={course._id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedItemIndex(index);
              }}
            >
              <h1
                className={`text-2xl px-5 ${selectedItemIndex === index ? "text-tertary border-tertary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3" : "text-white"}`}
              >
                {course.title}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center gap-10 md:flex-row flex-col">
          <div className="flex flex-col gap-5 ">
            <h1 className="text-secondary text-xl">
              {courses[selectedItemIndex].title}
            </h1>

            <p className="text-white text-xl">
              {courses[selectedItemIndex].description}
            </p>
            <p className="text-white text-xl underline">
              <a
                href={courses[selectedItemIndex].link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {courses[selectedItemIndex].link && "Course link"}
              </a>
            </p>
          </div>
          <img
            src={courses[selectedItemIndex].image}
            alt="empty"
            className="h-52 w-80"
          />
        </div>
      </div>
    </div>
  );
}

export default Courses;
