import React from 'react';

const Values = () => {
  return (
    <div className="text-center py-10 mx-44">
      <h3 className="text-sm text-start uppercase tracking-wide text-gray-500 mb-4"><i class="fa-regular fa-circle text-xs"></i> Our Values</h3>
      <h2 className="text-3xl text-start font-light mb-8">Creating long-term value.</h2>
      <div className="flex justify-center space-x-8">
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">Supply Chain Blueprinting</h4>
          <p className="text-gray-600 mb-4">Blurb: Crafting a robust, long-term plan that aligns the supply chain with the company’s overall business objectives is essential. Supply Chain Blueprinting involves detailed planning and scenario analysis to ensure that the supply chain can adapt to changes in the market, customer demands, and technological advancements. This strategic approach ensures that the supply chain is resilient, cost-effective, and capable of supporting growth.</p>
          <a href="/" className="text-gray-600">View more →</a>
        </div>
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">Operational Excellence</h4>
          <p className="text-gray-600 mb-4">Blurb: The consistent and efficient execution of supply chain processes is critical for maintaining competitive advantage. Operational Excellence focuses on optimizing every stage of the supply chain, from procurement to delivery, ensuring that resources are used efficiently and that customer needs are met reliably. This involves continuous improvement initiatives, lean practices, and a focus on reducing waste and variability in operations.</p>
          <a href="/" className="text-gray-600">View more →</a>
        </div>
        <div className="text-left border-l border-red-500 px-3">
          <h4 className="text-xl font-semibold mb-2">Data-Driven Decision-Making</h4>
          <p className="text-gray-600 mb-4">Blurb: Leveraging data analytics to inform decisions throughout the supply chain is a game-changer for modern enterprises. Data-Driven Decision-Making involves the use of advanced analytics, AI, and machine learning to gain insights into supply chain performance, predict trends, and optimize operations. This approach enables companies to be proactive rather than reactive, leading to improved efficiency, reduced costs, and better service levels.</p>
          <a href="/" className="text-gray-600 ">View more →</a>
        </div>
      </div>
    </div>
  );
};

export default Values;
