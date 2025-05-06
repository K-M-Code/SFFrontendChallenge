import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DroneDashboard from './ui/components/organisms/DroneDashboard';

function App() {
    return (
      <div className="App bg-gray-50 min-h-screen">
        <h1 className="text-xl font-bold text-center mt-10">Frontend Coding Challenge</h1>;
        <DroneDashboard />
      </div>
    );
  }
  

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);