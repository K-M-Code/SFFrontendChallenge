import React from "react";
import { Badge } from "../atoms/shadcn/badge";
import { DroneStatus } from "@/lib/droneUtils";

/**
 * @interface StatusBadgeProps
 * @description Props for the StatusBadge component.
 * @property {DroneStatus} status - The drone status to display.
 */
interface StatusBadgeProps {
  status: DroneStatus;
}

/**
 * StatusBadge Atom Component
 * Displays a drone's status using a styled badge.
 * BEM-style: `status-badge` block.
 *
 * @param {StatusBadgeProps} props - The props for the component.
 * @returns {JSX.Element} The rendered status badge.
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let variant: "default" | "secondary" | "destructive" | "outline" = "default";
  switch (status) {
    case "IDLE":
      variant = "secondary";
      break;
    case "MOVING":
      variant = "default";
      break;
    case "JAMMED":
      variant = "destructive";
      break;
  }

  return (
    <Badge variant={variant} className="status-badge uppercase">
      {status}
    </Badge>
  );
};

export default StatusBadge;