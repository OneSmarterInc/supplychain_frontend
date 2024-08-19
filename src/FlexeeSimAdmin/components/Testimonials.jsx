import React from "react";

const Testimonials = () => {
  return (
    <div className="bg-pink-200 text-center p-10 relative mx-10">
      <h2 className="text-4xl font-bold mb-4">Testimonials</h2>
      <p className="text-lg mb-4 px-28">
        Eudi no minavi se tentiae te vix. Par tem de mo ritum re prehe dunt in
        pro. Au gue ne more ceteri neius, cu fallitu cetero duo. Nec obli que lu
        patum in, an brute exercit fast idui qui. Pri ferri li bera visse in te
        preta risne, sonet vocent ea sit euo porte re it viu time am ofendit.
      </p>
      <p className="font-semibold">Paulette Myers</p>
      <p className="text-sm">Art Director</p>
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 ">
        <button className="text-2xl">←</button>
      </div>
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <button className="text-2xl">→</button>
      </div>
    </div>
  );
};

export default Testimonials;
