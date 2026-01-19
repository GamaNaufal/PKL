// Mock data for part numbers and machine numbers for the press history form

export const PART_NUMBERS = [
  // Example: Replace with real part numbers later
  "PN-001",
  "PN-002",
  "PN-003",
  "PN-004",
  "PN-005",
  // ... up to ~190
  ...Array.from(
    { length: 185 },
    (_, i) => `PN-${(i + 6).toString().padStart(3, "0")}`
  ),
];

export const MACHINE_NUMBERS = [
  "MC-01",
  "MC-02",
  "MC-03",
  "MC-04",
  "MC-05",
  "MC-06",
  "MC-07",
  "MC-08",
  "MC-09",
  "MC-10",
];
