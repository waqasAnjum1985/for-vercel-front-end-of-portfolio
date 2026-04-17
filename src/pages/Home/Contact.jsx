import React from "react";
import SectionTitle from "../../components/SectionTitle.jsx";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function Contact() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  const { lottieURL } = contact;
  return (
    <div>
      <SectionTitle title="Say Hello" />
      <div className="flex items-center justify-between flex-col md:flex-row  -mb-28">
        <div className="flex flex-col ">
          <p className="text-tertary">{"{"}</p>
          {Object.keys(contact).map(
            (key) =>
              key !== "_id" &&
              key !== "lottieURL" && (
                <p key={key} className="ml-5 text-xl">
                  <span className="text-tertary">{key} : </span>
                  <span className="text-tertary">{contact[key]}</span>
                </p>
              ),
          )}
          <p className="text-tertary">{"}"}</p>
        </div>
        <div className="h-[70vh]  w-full">
          <DotLottieReact
            src={lottieURL}
            autoplay="true"
            loop="true"
            speed={1}
            mode="forward"
          />
        </div>
      </div>
    </div>
  );
}

export default Contact;
