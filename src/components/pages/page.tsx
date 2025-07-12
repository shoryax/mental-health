import React from 'react';

const Page = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-4">
            Explore by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the support you need with our organized collection of mental health resources
          </p>
        </div>

        {/* Categories will be rendered here */}
      </div>
    </div>
  );
};

export default Page;