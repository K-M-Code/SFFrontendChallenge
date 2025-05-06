import { z } from 'zod';


/**
 * Enumerates the possible status types of a drone.
 * @typedef {"IDLE" | "MOVING" | "JAMMED"} DroneStatus
 */
export const DroneStatusEnum = z.enum(["IDLE", "MOVING", "JAMMED"]);
export type DroneStatus = z.infer<typeof DroneStatusEnum>;

/**
 * Represents geographic coordinates with latitude and longitude.
 * @typedef {Object} Coordinates
 * @property {number} latitude - Latitude in decimal degrees.
 * @property {number} longitude - Longitude in decimal degrees.
 */
export const CoordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});
export type Coordinates = z.infer<typeof CoordinatesSchema>;

/**
 * Represents telemetry data for a drone, including its location, movement, and signal information.
 * @typedef {Object} DroneTelemetry
 * @property {string} id - Unique identifier for the drone.
 * @property {Coordinates} coordinates - Geographic coordinates of the drone.
 * @property {number} altitude - Altitude of the drone in meters.
 * @property {number} speed - Speed of the drone in kilometers per hour.
 * @property {number} signalStrength - Signal strength of the drone's transmission in decibels.
 * @property {number} frequency - Frequency of the drone's transmission in megahertz.
 * @property {DroneStatus} status - Current status of the drone.
 */


// Define the Zod schema for DroneTelemetry
export const DroneTelemetrySchema = z.object({
  id: z.string(),
  coordinates: CoordinatesSchema,
  altitude: z.number().nonnegative(),
  speed: z.number().nonnegative(),
  signalStrength: z.number(),
  frequency: z.number().nonnegative(),
  status: DroneStatusEnum,
});
export type DroneTelemetry = z.infer<typeof DroneTelemetrySchema>;

/**
 * Validates a `DroneTelemetry` object.
 * @param telemetry - Telemetry data to validate.
 * @returns True if the telemetry data is valid, false otherwise.
 */
export function isValidDroneTelemetry(telemetry: DroneTelemetry | null | undefined): boolean {
  if (!telemetry) return false;
  const { coordinates, altitude, speed, signalStrength, frequency } = telemetry;
  if (!coordinates || !isValidCoordinates(coordinates)) return false;
  if (altitude < 0 || speed < 0 || signalStrength < 0 || frequency < 0) return false;
  return true;
}
   
   /**
    * Validates a `Coordinates` object.
    * @param coordinates - Coordinates to validate.
    * @returns True if the coordinates are valid, false otherwise.
    */
   export function isValidCoordinates(coordinates: Coordinates): boolean {
    const { latitude, longitude } = coordinates;
    return latitude >= -90 && latitude <= 90 && longitude >= -180 && longitude <= 180;
  }
   


/**
 * Defines a rectangular no-fly zone with geographic boundaries.
 * @private
 */
const NO_FLY_ZONE = {
  north: 10.50,
  south: 50.50,
  east: 30.50,
  west: 40.50,
};

/**
 * Checks if a drone is within the defined no-fly zone based on its telemetry data.
 * @param {DroneTelemetry} telemetry - Telemetry data of the drone to check.
 * @returns {boolean} True if the drone is inside the no-fly zone, false otherwise.
 */
export function isDroneInNoFlyZone(telemetry: DroneTelemetry | null | undefined): boolean {
    if (!isValidDroneTelemetry(telemetry)) return false;
    const validTelemetry = telemetry as DroneTelemetry;
    const { latitude, longitude } = validTelemetry.coordinates;
    return (
    latitude >= NO_FLY_ZONE.south &&
    latitude <= NO_FLY_ZONE.north &&
    longitude >= NO_FLY_ZONE.west &&
    longitude <= NO_FLY_ZONE.east
    );
}
