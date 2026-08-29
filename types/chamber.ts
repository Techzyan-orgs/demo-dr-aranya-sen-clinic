export interface Chamber {
  id: string;
  clinicName: string;
  location: string;
  address: string;
  days: string[];
  timing: string; // e.g., "05:00 PM - 08:30 PM"
  status: "active" | "starting_soon" | "closed";
  statusText?: string;
  currentQueue: number;
  totalTokensToday: number;
  contactNumber: string;
  mapQuery?: string;
  chamberRoom?: string;
  floor?: string;
}
