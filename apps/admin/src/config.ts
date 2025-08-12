export const Config = {
  API_BASE_URL: "https://api.reflectionsprojections.org",
  // API_BASE_URL: "http://localhost:3000",
  EVENT_TYPES: [
    "SPEAKER",
    "CORPORATE",
    "SPECIAL",
    "PARTNERS",
    "MEALS",
    "CHECKIN"
  ],
  COMMITTEE_TYPES: [
    "CONTENT",
    "CORPORATE",
    "DESIGN",
    "DEV",
    "FULL TEAM",
    "MARKETING",
    "OPERATIONS"
  ]
} as const;
