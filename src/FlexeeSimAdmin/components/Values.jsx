import React from 'react';

const Values = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mb-8">
        {/* <h3 className="text-sm text-start uppercase tracking-wide text-gray-500 mb-4 flex items-center">
          <i className="fa-regular fa-circle text-xs mr-2"></i> Our Values
        </h3> */}
        <h2 className="text-2xl md:text-3xl text-start font-light mb-8">Flexee teaches you how to create long long supply chain value.</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ValueCard
            title="Supply Chain Blueprinting"
            description="Crafting a robust, long-term plan that aligns the supply chain with the company’s overall business objectives is essential. Supply Chain Blueprinting involves detailed planning and scenario analysis to ensure that the supply chain can adapt to changes in the market, customer demands, and technological advancements. This strategic approach ensures that the supply chain is resilient, cost-effective, and capable of supporting growth."
            // linkText="View more →"
          />
          <ValueCard
            title="Operational Excellence"
            description="The consistent and efficient execution of supply chain processes is critical for maintaining competitive advantage. Operational Excellence focuses on optimizing every stage of the supply chain, from procurement to delivery, ensuring that resources are used efficiently and that customer needs are met reliably. This involves continuous improvement initiatives, lean practices, and a focus on reducing waste and variability in operations."
            // linkText="View more →"
          />
          <ValueCard
            title="Data-Driven Decision-Making"
            description="Leveraging data analytics to inform decisions throughout the supply chain is a game-changer for modern enterprises. Data-Driven Decision-Making involves the use of advanced analytics, AI, and machine learning to gain insights into supply chain performance, predict trends, and optimize operations. This approach enables companies to be proactive rather than reactive, leading to improved efficiency, reduced costs, and better service levels."
            // linkText="View more →"
          />
        </div>
      </div>
      <hr />
    </div>
  );
};

const ValueCard = ({ title, description, linkText }) => (
  <div className="text-left border-l-4 border-red-500 pl-4">
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 mb-4">{description}</p>
    <a href="/" className="text-gray-600 hover:text-red-500">{linkText}</a>
  </div>
);

export default Values;