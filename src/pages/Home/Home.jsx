import React from "react";
import Header from "../../components/Header";
import Intro from "../Home/Intro.jsx";
import About from "../Home/About.jsx";
import Experiences from "./Experiences.jsx";
import Projects from "./Projects.jsx";
import Courses from "./Courses.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";
import LeftSider from "./LeftSider.jsx";
import { useSelector } from "react-redux";
function Home() {
  const { portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div className="bg-primary md:px-40 px-5 ">
          <Intro />
          <About />
          <Experiences />
          <Projects />
          <Courses />
          <Contact />
          <Footer />
          <LeftSider />
        </div>
      )}
    </div>
  );
}

export default Home;
