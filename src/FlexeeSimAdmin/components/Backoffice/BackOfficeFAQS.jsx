import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const faqData = [
  {
    question: "Sed porta orci pretium, consectetur lorem a, finibus lacus.",
    answer: `Etiam accumsan turpis mi, dictum feugiat ligula ultrices eu. In
      sagittis magna vitae semper lacinia. Morbi leo tortor, egestas ut
      neque vitae, suscipit convallis dolor. Maecenas urna mi, rutrum eget
      ante sed, sollicitudin iaculis justo. Suspendisse rhoncus suscipit
      nisi in maximus. Suspendisse massa ipsum, posuere at imperdiet nec,
      condimentum vitae nisi. Fusce lacinia, neque eu accumsan
      sollicitudin, tellus neque tincidunt neque, non suscipit erat erat
      at ipsum. Quisque tristique sapien sed enim lacinia convallis. Sed
      in tincidunt urna, in lobortis sem. Interdum et malesuada fames ac
      ante ipsum primis in faucibus. Phasellus justo lectus, egestas
      imperdiet fermentum quis, tempor in elit. Aenean ac urna bibendum,
      blandit tellus ac, semper ligula. Vestibulum scelerisque, ligula id
      consectetur faucibus, enim augue hendrerit nunc, et feugiat ex eros
      ac leo. Etiam varius risus sit amet urna lobortis tristique. Orci
      varius natoque penatibus et magnis dis parturient montes, nascetur
      ridiculus mus.`,
  },
  {
    question: "Aliquam quis ipsum eu odio vestibulum consequat id non nibh.",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      convallis efficitur lorem, at facilisis risus aliquam non. Duis
      ullamcorper maximus dolor id convallis.`,
  },
  {
    question: "Aliquam quis ipsum eu odio vestibulum consequat id non nibh.",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      convallis efficitur lorem, at facilisis risus aliquam non. Duis
      ullamcorper maximus dolor id convallis.`,
  },
  {
    question: "Aliquam quis ipsum eu odio vestibulum consequat id non nibh.",
    answer: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
      convallis efficitur lorem, at facilisis risus aliquam non. Duis
      ullamcorper maximus dolor id convallis.`,
  },
  // Add more FAQs as needed
];

const BackOfficeFAQS = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 m-0 px-10">
      <div className="w-full">
        <h3 className="text-2xl px-2 text-start font-semibold mb-4  border-0 border-b pb-3 border-b-gray-500 border-opacity-20">
          FREQUENTLY ASKED QUESTIONS
        </h3>
      </div>
      <div className="container text-start mx-auto px-4 py-8 border-2 border-gray-500 rounded-md border-opacity-30">
        {faqData.map((faq, index) => (
          <div key={index} className="border-b border-gray-300 mb-3 pb-3">
            <div
              className="flex items-center justify-between py-4 cursor-pointer"
              onClick={() => handleToggle(index)}
            >
              <p
                className={`font-medium ${
                  activeIndex === index ? "text-red-600" : "text-gray-800"
                }`}
              >
                {faq.question}
              </p>
              <FontAwesomeIcon
                icon={activeIndex === index ? faMinus : faPlus}
                className="text-red-600"
              />
            </div>
            {activeIndex === index && (
              <p className="text-gray-600 text-sm px-4 py-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackOfficeFAQS;
