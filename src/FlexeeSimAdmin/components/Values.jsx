import React from 'react';

const Values = () => {
  return (
    <div className="text-center py-10 mx-44">
      <h3 className="text-sm text-start uppercase tracking-wide text-gray-500 mb-4"><i class="fa-regular fa-circle text-xs"></i> Our Values</h3>
      <h2 className="text-3xl text-start font-light mb-8">Creating long-term value.</h2>
      <div className="flex justify-center space-x-8">
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">People Value</h4>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, conse ctetur sadipsicing elit, sed domius euisum od tempor incidid idu nt ut labore et dolore magna aliqua.</p>
          <a href="/" className="text-gray-600">View more →</a>
        </div>
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">Client Value</h4>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, conse ctetur sadipsicing elit, sed domius euisum od tempor incidid idu nt ut labore et dolore magna aliqua.</p>
          <a href="/" className="text-gray-600">View more →</a>
        </div>
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">Societal Value</h4>
          <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, conse ctetur sadipsicing elit, sed domius euisum od tempor incidid idu nt ut labore et dolore magna aliqua.</p>
          <a href="/" className="text-gray-600 ">View more →</a>
        </div>
      </div>
    </div>
  );
};

export default Values;
