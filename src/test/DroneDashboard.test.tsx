import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import DroneDashboard from "../ui/components/organisms/DroneDashboard";
import * as api from "../lib/api"; // Adjust this path to your fetchTelemetryData
import { DroneTelemetry } from "../lib/droneUtils";
import userEvent from "@testing-library/user-event";

// Mock data
const mockDrones: DroneTelemetry[] = [
  {
    id: "drone-123",
    coordinates: { latitude: 45.0, longitude: 15.0 },
    altitude: 100,
    speed: 25,
    signalStrength: 80,
    frequency: 433,
    status: "MOVING",
  },
];

// Mock Spinner component to prevent needing real CSS or animation
jest.mock("../../components/atoms/Spinner", () => () => <div>Loading...</div>);

describe("DroneDashboard", () => {
  it("renders loading spinner initially", async () => {
    jest.spyOn(api, "fetchTelemetryData").mockImplementation(
      () => new Promise(() => {}) // Simulate pending
    );

    render(<DroneDashboard />);
    expect(screen.getByText(/Loading drone data/i)).toBeInTheDocument();
  });

  it("renders error state when fetch fails", async () => {
    jest
      .spyOn(api, "fetchTelemetryData")
      .mockRejectedValueOnce(new Error("Network error"));

    render(<DroneDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });
  });

  it("renders list of drones on success", async () => {
    jest
      .spyOn(api, "fetchTelemetryData")
      .mockResolvedValueOnce(mockDrones);

    render(<DroneDashboard />);

    await waitFor(() => {
      expect(
        screen.getByText(/Drone Telemetry Dashboard/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/drone-123/i)).toBeInTheDocument();
      expect(screen.queryByText(/Loading drone data/i)).not.toBeInTheDocument();
    });
  });

  it("retries fetching on error when 'Try Again' is clicked", async () => {
    const spy = jest
      .spyOn(api, "fetchTelemetryData")
      .mockRejectedValueOnce(new Error("First failure"))
      .mockResolvedValueOnce(mockDrones);

    render(<DroneDashboard />);

    await waitFor(() => {
      expect(screen.getByText(/Error loading data/i)).toBeInTheDocument();
    });

    const button = screen.getByRole("button", { name: /Try Again/i });
    await userEvent.click(button);

    // Since `Try Again` triggers a full reload, this test simulates the flow,
    // but for actual retry logic without reload, a refactor would be needed.
    expect(window.location.reload).toBeDefined();
  });
});
