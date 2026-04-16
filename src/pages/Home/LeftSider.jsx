import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { DiGithubBadge } from "react-icons/di";
import { FaWhatsappSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

function LeftSider() {
  const { portfolioData } = useSelector((state) => state.root);
  const { sidebar } = portfolioData;
  const { watsapp, facebook, gmail, instagram, linkedin, githubb } = sidebar;
  return (
    <div className="md:fixed md:left-0 md:bottom-0 md:px-10 static">
      <div className="flex flex-col items-center">
        <div className="flex md:flex-col flex-row gap-3">
          <a href={watsapp} target="_blank" rel="noopener noreferrer">
            <FaWhatsappSquare className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer hover:text-white" />
          </a>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer hover:text-white" />
          </a>
          <a href={gmail} target="_blank" rel="noopener noreferrer">
            <IoMdMail className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer  hover:text-white" />
          </a>
          <a href={instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagramSquare className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer  hover:text-white" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer  hover:text-white" />
          </a>
          <a href={githubb} target="_blank" rel="noopener noreferrer">
            <DiGithubBadge className="text-gray-600 md:text-5xl text-3xl hover:cursor-pointer  hover:text-white" />
          </a>
        </div>
        <div className="md:w-[1px] md:h-32 md:bg-[#125f63]"></div>
      </div>
    </div>
  );
}

export default LeftSider;
