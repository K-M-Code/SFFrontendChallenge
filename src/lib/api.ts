import { DroneTelemetry, DroneTelemetrySchema, DroneStatus } from './droneUtils';
import { z } from 'zod';

// Sample data that conforms to DroneTelemetrySchema
const mockDronesData: DroneTelemetry[] = [
  {
    id: "alpha-001",
    coordinates: { latitude: 34.025, longitude: -118.275 },
    altitude: 100,
    speed: 10,
    signalStrength: -60,
    frequency: 2.4,
    status: "MOVING",
  },
  {
    id: "bravo-002",
    coordinates: { latitude: 37.7749, longitude: -122.4194 },
    altitude: 200,
    speed: 25,
    signalStrength: -45,
    frequency: 5.8,
    status: "IDLE",
  },
  {
    id: "charlie-003",
    coordinates: { latitude: 36.1699, longitude: -115.1398 },
    altitude: 150,
    speed: 0,
    signalStrength: -70,
    frequency: 2.4,
    status: "IDLE",
  },
  {
    id: "delta-004",
    coordinates: { latitude: 40.7128, longitude: -74.006 },
    altitude: 300,
    speed: 40,
    signalStrength: -50,
    frequency: 5.8,
    status: "MOVING",
  },
  {
    id: "echo-005",
    coordinates: { latitude: 47.6062, longitude: -122.3321 },
    altitude: 120,
    speed: 5,
    signalStrength: -65,
    frequency: 2.4,
    status: "JAMMED",
  },
  {
    id: "foxtrot-006",
    coordinates: { latitude: 25.7617, longitude: -80.1918 },
    altitude: 90,
    speed: 15,
    signalStrength: -55,
    frequency: 5.0,
    status: "MOVING",
  },
];

/**
 * Fetches mock drone telemetry data asynchronously.
 * Simulates an API call with a delay.
 * Validates data against Zod schema.
 *
 * @returns {Promise<DroneTelemetry[]>} A promise that resolves to an array of drone telemetry data.
 * @throws {Error} if fetching or parsing fails.
 */
export const fetchTelemetryData = async (): Promise<DroneTelemetry[]> => {
  console.log("API: Fetching telemetry data...");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate potential API error randomly
        if (Math.random() < 0.05) { // 5% chance of error
            console.error("API: Simulated fetch error");
            reject(new Error("Simulated API fetch error."));
            return;
        }

        // Use Zod to parse and validate each drone object
        const validatedData = z.array(DroneTelemetrySchema).parse(mockDronesData);
        console.log("API: Data fetched and validated successfully.");
        resolve(validatedData);
      } catch (error) {
        console.error("API: Data validation failed", error);
        if (error instanceof z.ZodError) {
          reject(new Error(`Data validation failed: ${error.errors.map(e => e.message).join(', ')}`));
        } else {
          reject(new Error("An unknown error occurred during data processing."));
        }
      }
    }, 2500); // Simulate 2.5 second network delay
  });
};

