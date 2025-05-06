import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import DroneDashboard from './ui/components/organisms/DroneDashboard';

function App() {
    return (
      <div className="App bg-gray-50 min-h-screen">
        <DroneDashboard />
      </div>
    );
  }
  

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);