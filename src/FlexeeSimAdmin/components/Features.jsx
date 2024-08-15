import React from "react";
import feature1 from "../Assets/Service.png";
import feature2 from "../Assets/Demand.png";
import feature3 from "../Assets/IT.png";
import feature4 from "../Assets/Forecast.png";

const features = [
  {
    title: "Feature 1",
    description:
      "Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat",
    icon: feature1,
    bgColor: "bg-blue-100",
    textColor: "text-blue-800",
    linkColor: "text-blue-500",
  },
  {
    title: "Feature 2",
    description:
      "Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ulla",
    icon: feature2,
    bgColor: "bg-cyan-100",
    textColor: "text-cyan-800",
    linkColor: "text-cyan-500",
  },
  {
    title: "Feature 3",
    description:
      "Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat ullamco ulla",
    icon: feature3,
    bgColor: "bg-red-100",
    textColor: "text-red-800",
    linkColor: "text-red-500",
  },
  {
    title: "Feature 4",
    description:
      "Labore proident nisi fugiat nostrud sint mollit aliqua ipsum ad veniam cupidatat",
    icon: feature4,
    bgColor: "bg-purple-100",
    textColor: "text-purple-800",
    linkColor: "text-purple-500",
  },
];

const Features = () => {
  return (
    <div className="h-screen">
      <div className="bg-gray-100 p-8 mx-20">
        <div className="text-center mb-8">
          <p className="text-gray-500">Dolore dolore voluptate aliqua ut mi</p>
          <h2 className="text-4xl font-bold text-gray-800">Features</h2>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3 ">
          <div className={`p-6 rounded-lg shadow-lg ${features[0].bgColor}`}>
            <div className="h-32">
              <h3
                className={`text-2xl font-bold mb-2 ${features[0].textColor}`}
              >
                {features[0].title}
              </h3>
              <p className="text-gray-700 mb-4">{features[0].description}</p>
            </div>
            <div className="flex h-20 justify-between items-end">
              <a href="/" className={`underline ${features[0].linkColor}`}>
                Try now
              </a>
              <img
                src={features[0].icon}
                alt={features[0].title}
                className="h-16"
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-lg shadow-lg ${features[1].bgColor} md:col-span-2`}
          >
            <div className="h-32">
              <h3
                className={`text-2xl font-bold mb-2 ${features[1].textColor}`}
              >
                {features[1].title}
              </h3>
              <p className="text-gray-700 mb-4">{features[1].description}</p>
            </div>
            <div className="flex h-20 justify-between items-end">
              <a href="/" className={`underline ${features[1].linkColor}`}>
                Try now
              </a>
              <img
                src={features[1].icon}
                alt={features[1].title}
                className="h-16"
              />
            </div>
          </div>

          <div
            className={`p-6 rounded-lg shadow-lg ${features[2].bgColor} md:col-span-2`}
          >
            <div className="h-32">
              <h3
                className={`text-2xl font-bold mb-2 ${features[2].textColor}`}
              >
                {features[2].title}
              </h3>
              <p className="text-gray-700 mb-4">{features[2].description}</p>
            </div>
            <div className="flex h-20  justify-between items-end">
              <a href="/" className={`underline ${features[2].linkColor}`}>
                Try now
              </a>
              <img
                src={features[2].icon}
                alt={features[2].title}
                className="h-16"
              />
            </div>
          </div>

          <div className={`p-6 rounded-lg shadow-lg ${features[3].bgColor}`}>
            <div className="h-32">
              <h3
                className={`text-2xl font-bold mb-2 ${features[3].textColor}`}
              >
                {features[3].title}
              </h3>
              <p className="text-gray-700 mb-4">{features[3].description}</p>
            </div>
            <div className="flex h-20  justify-between items-end">
              <a href="/" className={`underline ${features[3].linkColor}`}>
                Try now
              </a>
              <img
                src={features[3].icon}
                alt={features[3].title}
                className="h-16"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
