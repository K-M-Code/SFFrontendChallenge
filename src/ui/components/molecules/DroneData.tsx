import React from "react";
import { DataValueItem } from "../atoms/DataValueItem";
import { DroneTelemetry, Coordinates } from '@/lib/droneUtils';

/**
 * @interface TelemetryDetailsProps
 * @description Props for the TelemetryDetails component.
 * @property {Pick<DroneTelemetry, 'altitude' | 'speed' | 'signalStrength' | 'frequency' | 'coordinates'>} data -
 *           The telemetry data fields to display.
 */
interface TelemetryDetailsProps {
    data: Pick<DroneTelemetry, 'altitude' | 'speed' | 'signalStrength' | 'frequency' | 'coordinates'>;
  }
  
  /**
   * Formats coordinates for display.
   * @param {Coordinates} coords - The coordinates object.
   * @returns {string} Formatted coordinate string.
   */
  const formatCoordinates = (coords: Coordinates): string => {
    return `Lat: ${coords.latitude.toFixed(4)}, Lng: ${coords.longitude.toFixed(4)}`;
  };
  
  /**
   * DroneData Molecule Component
   * Displays a group of specific telemetry data points.
   * BEM-style: `telemetry-details` block.
   *
   * @param {TelemetryDetailsProps} props - The props for the component.
   * @returns {JSX.Element} The rendered telemetry details.
   */
  const DroneData: React.FC<TelemetryDetailsProps> = ({ data }) => {
    return (
      <div className="telemetry-details space-y-1">
        <DataValueItem label="Coords" value={formatCoordinates(data.coordinates)} />
        <DataValueItem label="Altitude" value={`${data.altitude} m`} />
        <DataValueItem label="Speed" value={`${data.speed} m/s`} />
        <DataValueItem label="Signal" value={`${data.signalStrength} dBm`} />
        <DataValueItem label="Frequency" value={`${data.frequency} GHz`} />
      </div>
    );
  };
  
  export default DroneData;