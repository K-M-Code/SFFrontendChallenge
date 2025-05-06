import React from "react";
import { DroneTelemetry, isDroneInNoFlyZone } from '@/lib/droneUtils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/ui/components/atoms/shadcn/card";
import DroneData from '@/ui/components/molecules/DroneData';
import StatusBadge from '@/ui/components/atoms/StatusBadge';
import { cn } from "@/lib/utils";

/**
 * @interface DroneCardProps
 * @description Props for the DroneCard component.
 * @property {DroneTelemetry} telemetry - The telemetry data for the drone.
 */
interface DroneCardProps {
  telemetry: DroneTelemetry;
}

/**
 * DroneCard Organism Component
 * Displays comprehensive telemetry data for a single drone in a card format.
 * Highlights the card if the drone is in a no-fly zone.
 * BEM-style: `drone-card` block, with modifiers like `drone-card--no-fly-zone`.
 *
 * @param {DroneCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered drone card.
 */
const DroneCard: React.FC<DroneCardProps> = ({ telemetry }) => {
  const isInNoFlyZone = isDroneInNoFlyZone(telemetry);

  return (
    <Card className={cn(
      "drone-card w-full max-w-sm transition-all duration-300 ease-in-out",
      isInNoFlyZone && "drone-card--no-fly-zone bg-red-100 border-red-500 ring-2 ring-red-500"
    )}>
      <CardHeader className="drone-card__header pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="drone-card__id text-lg">Drone ID: {telemetry.id}</CardTitle>
            {isInNoFlyZone && (
              <CardDescription className="drone-card__warning text-red-700 font-semibold">
                WARNING: In No-Fly Zone!
              </CardDescription>
            )}
          </div>
          <StatusBadge status={telemetry.status} />
        </div>
      </CardHeader>
      <CardContent className="drone-card__content">
        <DroneData data={telemetry} />
      </CardContent>
    </Card>
  );
};

export default DroneCard;