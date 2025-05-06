import DroneCard from '@/ui/components/organisms/DroneCard';
import { DroneTelemetry } from '@/lib/droneUtils';
import React from 'react';

/**
 * @interface DroneListProps
 * @description Props for the DroneList component.
 * @property {DroneTelemetry[]} drones - An array of drone telemetry data.
 */
interface DroneListProps {
  drones: DroneTelemetry[];
}

/**
 * DroneList Organism Component
 * Renders a list of DroneCard components.
 * BEM-style: `drone-list` block.
 *
 * @param {DroneListProps} props - The props for the component.
 * @returns {JSX.Element} The rendered list of drone cards.
 */
const DroneList: React.FC<DroneListProps> = ({ drones }) => {
  if (!drones || drones.length === 0) {
    return <p className="drone-list__empty-message text-center text-white">No drone data available.</p>;
  }

  return (
    <div className="drone-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {drones.map((telemetry) => (
        <DroneCard key={telemetry.id} telemetry={telemetry} />
      ))}
    </div>
  );
};

export default DroneList;