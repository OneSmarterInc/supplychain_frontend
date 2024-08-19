import React from "react";
import forecast from "../Assets/ForecastImg.png";
import service from "../Assets/SrviceDecision.png";
import demand from "../Assets/DemandGeneration.png";
import it from "../Assets/ITDecision.png";
import procurement from "../Assets/Procurement.png";
import manufacturing from "../Assets/Manufacturing.png";
import transport from "../Assets/Transportation.png";
import distribution from "../Assets/Distribution.png";
function DecisionPreview() {
  return (
    <div className="bg-gray-800 text-white min-h-screen py-12 px-4">
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Forecast Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={forecast} alt="" className="h-full w-full" />
        </div>
      </div>
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Procurement Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={procurement} alt="" className="h-full w-full" />
        </div>
      </div>
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Manufacturing Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={manufacturing} alt="" className="h-full w-full" />
        </div>
      </div>
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Distribution Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={distribution} alt="" className="h-full w-full" />
        </div>
      </div>
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Service Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={service} alt="" className="h-full w-full" />
        </div>
      </div>{" "}
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Transportation Decision
        </h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={transport} alt="" className="h-full w-full" />
        </div>
      </div>{" "}
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">Demand Decision</h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={demand} alt="" className="h-full w-full" />
        </div>
      </div>{" "}
      {/* ------------- */}
      <div className="container bg-gray-700 p-5 mx-auto my-4">
        <h1 className="text-3xl font-bold text-center mb-8">It Decision</h1>
        <p className="text-center mb-8 text-lg">
          Occaecat est ipsum reprehenderit reprehenderit veniam anim laborum est
          esse duis occaecat reprehenderit pariatur.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <img src={it} alt="" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export default DecisionPreview;
