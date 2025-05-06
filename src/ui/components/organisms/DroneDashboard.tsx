import React, { useEffect, useState } from 'react';
import { DroneTelemetry } from '../../../lib/droneUtils';
import { fetchTelemetryData } from '../../../lib/api';
import DroneList from '../../components/organisms/DroneList';
import Spinner from '../../components/atoms/Spinner';

/**
 * DroneDashboard Component
 * Fetches drone telemetry data and displays it using DroneList.
 * Shows a loading state and handles errors.
 */
const DroneDashboard: React.FC = () => {
  const [drones, setDrones] = useState<DroneTelemetry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await fetchTelemetryData();
        setDrones(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        console.error("Failed to fetch drone telemetry:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
        <p className="ml-2 text-lg">Loading drone data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <p className="text-xl font-semibold">Error loading data</p>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()} // Simple refresh, or could re-trigger fetch
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Drone Telemetry Dashboard</h1>
      <DroneList drones={drones} />
    </div>
  );
};

export default DroneDashboard;