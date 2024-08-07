import React from 'react';

const Header = () => (
  <header className="bg-gray-800 text-white p-4 md:p-6 flex justify-between items-center">
    <div className="flex items-center">
      
      <h1 className="text-2xl md:text-4xl font-bold">Product Dashboard</h1>
    </div>
    <div className="flex items-center space-x-4">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Add Product
      </button>
     
    </div>
  </header>
);

export default Header;
