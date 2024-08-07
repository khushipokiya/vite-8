import React,{useState} from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ProductTable from './components/ProductTable';
import { ProductProvider } from './components/ProductContext';

import './App.css';
const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProductProvider>
    
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1">
          <Header />
          <main className="p-4">
            <ProductTable />
          </main>
        </div>
      </div>
     
    </ProductProvider>
  );
};

export default App;
