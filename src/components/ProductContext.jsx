import React, { createContext, useState, useContext } from 'react';


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

  const [products, setProducts] = useState([
    { name: 'Endeavor Daytrip Backpack', sku: '24-WB06', stock: 100, price: '$33.00', category: 'Erin Recommends', date: '2024/08/02 12:53 PM', status: 'Approved' },
    { name: 'Venture Travel Duffel', sku: '23-TR03', stock: 150, price: '$45.00', category: 'Popular Items', date: '2024/07/25 11:20 AM', status: 'Under Review' },
    { name: 'Journeyman Backpack', sku: '23-JB15', stock: 100, price: '$66.00', category: 'Daily Use', date: '2024/07/25 09:20 AM', status: 'Approved' },
    { name: 'Adventure Trail Jacket', sku: '24-AJ12', stock: 75, price: '$89.00', category: 'Outdoor Gear', date: '2024/07/30 10:00 AM', status: 'Approved' },
    { name: 'Urban Fitness Shoes', sku: '23-US24', stock: 200, price: '$55.00', category: 'Footwear', date: '2024/07/22 01:45 PM', status: 'Under Review' },
    { name: 'Eco-Friendly Water Bottle', sku: '24-WB09', stock: 300, price: '$15.00', category: 'Accessories', date: '2024/07/28 02:30 PM', status: 'Approved' },
    { name: 'Multi-Purpose Camping Tent', sku: '24-TT11', stock: 50, price: '$120.00', category: 'Camping', date: '2024/08/01 11:00 AM', status: 'Approved' },
    { name: 'Wireless Bluetooth Headphones', sku: '23-WH07', stock: 80, price: '$70.00', category: 'Electronics', date: '2024/07/26 04:15 PM', status: 'In Stock' },
  ]);

  
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
};


export const useProductContext = () => useContext(ProductContext);
