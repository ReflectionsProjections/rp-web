export type Attendee = {
  userId: string;
  name: string;
  email: string;
  events: string[];
  dietaryRestrictions: string[];
  allergies: string[];
  hasCheckedIn: boolean;
  points: number;
  hasPriority: {
    Mon: boolean;
    Tue: boolean;
    Wed: boolean;
    Thu: boolean;
    Fri: boolean;
    Sat: boolean;
    Sun: boolean;
  };
  hasRedeemedMerch: {
    Tshirt: boolean;
    Button: boolean;
    Tote: boolean;
    Cap: boolean;
  };
  isEligibleMerch: {
    Tshirt: boolean;
    Button: boolean;
    Tote: boolean;
    Cap: boolean;
  };
  favorites: string[];
  puzzlesCompleted: string[];
};

export type Corporate = {
  name: string;
  email: string;
};

export type DietaryRestrictionStats = {
  none: number;
  dietaryRestrictions: number;
  allergies: number;
  both: number;
  allergyCounts: { [key: string]: number };
  dietaryRestrictionCounts: { [key: string]: number };
};

export type EventType =
  | "SPEAKER"
  | "CORPORATE"
  | "SPECIAL"
  | "PARTNERS"
  | "MEALS"
  | "CHECKIN";

export type Event = {
  eventId: string;
  name: string;
  startTime: string;
  endTime: string;
  points: number;
  description: string;
  isVirtual: boolean;
  imageUrl: string | null;
  location: string;
  isVisible: boolean;
  attendanceCount: number;
  eventType: EventType;
};

export type Registration = {
  userId: string;
  name: string;
  email: string;
  university: string;
  graduation: string | null;
  major: string | null;
  dietaryRestrictions: string[];
  allergies: string[];
  gender: string | null;
  ethnicity: string[];
  hearAboutRP: string[];
  portfolios: string[];
  jobInterest: string[];
  isInterestedMechMania: boolean;
  isInterestedPuzzleBang: boolean;
  hasResume: boolean;
  hasSubmitted: boolean;
  degree?: string;
};

export type Role = "USER" | "STAFF" | "ADMIN" | "CORPORATE" | "PUZZLEBANG";

export type RoleObject = {
  userId?: string;
  displayName: string;
  email: string;
  roles: Role[];
};

export type CommitteeType =
  | "FULL TEAM"
  | "CONTENT"
  | "CORPORATE"
  | "DESIGN"
  | "DEV"
  | "MARKETING"
  | "OPERATIONS";

export type AttendanceType = "ABSENT" | "PRESENT" | "EXCUSED";

export type Staff = {
  userId: string;
  name: string;
  team: CommitteeType;
  attendances: Record<string, AttendanceType>;
};

export type Meeting = {
  meetingId: string;
  committeeType:
    | "FULL TEAM"
    | "CONTENT"
    | "CORPORATE"
    | "DESIGN"
    | "DEV"
    | "MARKETING"
    | "OPERATIONS";
  startTime: string;
};

export interface APIRoutes {
  "/attendee/emails": {
    GET: {
      response: Array<{ email: string; userId: string }>;
    };
  };
  "/attendee/id/:userId": {
    GET: {
      response: Attendee;
    };
  };
  "/attendee/redeemMerch/:item": {
    POST: {
      request: { userId: string };
      response: { message: string };
    };
  };
  "/auth": {
    PUT: {
      request: { email: string; role: Role };
      response: Role;
    };
    DELETE: {
      request: { email: string; role: Role };
      response: never;
    };
  };
  "/auth/:role": {
    GET: {
      response: RoleObject[];
    };
  };
  "/auth/login": {
    POST: {
      request: { code: string; redirectUri: string };
      response: { token: string };
    };
  };
  "/auth/info": {
    GET: {
      response: RoleObject;
    };
  };
  "/auth/corporate": {
    GET: {
      response: Corporate[];
    };
    POST: {
      request: Corporate;
      response: Corporate;
    };
    DELETE: {
      request: { email: string };
      response: never;
    };
  };
  "/auth/sponsor/verify": {
    POST: {
      request: {
        sixDigitCode: string;
        email: string;
      };
      response: { token: string };
    };
  };
  "/checkin/event": {
    POST: {
      request: { eventId: string; userId: string };
      response: never;
    };
  };
  "/checkin/scan/staff": {
    POST: {
      request: { eventId: string; qrCode: string };
      response: string;
    };
  };
  "/checkin/scan/merch": {
    POST: {
      request: { qrCode: string };
      response: string;
    };
  };
  "/events": {
    GET: {
      response: Event[];
    };
    POST: {
      request: Omit<Event, "eventId">;
      response: never;
    };
  };
  "/events/:eventId": {
    PUT: {
      request: Partial<Omit<Event, "eventId">>;
      response: never;
    };
    DELETE: {
      request: never;
      response: never;
    };
  };
  "/events/currentOrNext": {
    GET: {
      response: Event;
    };
  };
  "/registration/filter/pagecount": {
    POST: {
      request: {
        graduations?: string[];
        majors?: string[];
        jobInterests?: string[];
        degrees?: string[];
      };
      response: { pagecount: number };
    };
  };
  "/registration/filter/:page": {
    POST: {
      request: {
        graduations?: string[];
        majors?: string[];
        jobInterests?: string[];
        degrees?: string[];
      };
      response: {
        registrants: Registration[];
        page: number;
      };
    };
  };
  "/staff": {
    GET: {
      response: Staff[];
    };
  };
  "/staff/check-in": {
    POST: {
      request: { meetingId: string };
      response: never;
    };
  };
  "/meetings": {
    GET: {
      response: Meeting[];
    };
    POST: {
      request: { committeeType: CommitteeType; startTime: string };
      response: Omit<Meeting, "meetingId">;
    };
  };
  "/meetings/:meetingId": {
    PUT: {
      request: Partial<Omit<Meeting, "meetingId">>;
      response: Meeting;
    };
    DELETE: {
      request: never;
      response: never;
    };
  };
  "/s3/download/user/:userId": {
    GET: {
      response: { url: string };
    };
  };
  "/s3/download/batch": {
    POST: {
      request: { userIds: string[] };
      response: { data: (string | null)[]; errorCount: number };
    };
  };
  "/staff/:staffId/attendance": {
    POST: {
      request: { meetingId: string; attendanceType: AttendanceType };
      response: Staff;
    };
  };
  "/status": {
    GET: {
      response: never;
    };
  };
  "/stats/attendance/:n": {
    GET: {
      response: { attendanceCounts: number[] };
    };
  };
  "/stats/check-in": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/priority-attendee": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/dietary-restrictions": {
    GET: {
      response: DietaryRestrictionStats;
    };
  };
  "/stats/merch-item/:price": {
    GET: {
      response: { count: number };
    };
  };
}

type ExtractPathParams<Path extends string> =
  Path extends `${string}:${infer Param}/${infer Rest}`
    ? Param | ExtractPathParams<`/${Rest}`>
    : Path extends `${string}:${infer Param}`
      ? Param
      : never;

export function path<
  Pattern extends keyof APIRoutes,
  Params extends Record<ExtractPathParams<Pattern>, string | number>
>(pattern: Pattern, params: Params): Pattern {
  let builtPath: string = pattern;

  for (const key in params) {
    builtPath = builtPath.replace(
      new RegExp(`:${key}\\b`, "g"),
      encodeURIComponent(params[key].toString())
    );
  }

  return builtPath as Pattern;
}

export type RequestType<
  Path extends keyof APIRoutes,
  Method extends string
> = Method extends keyof APIRoutes[Path]
  ? "request" extends keyof APIRoutes[Path][Method]
    ? APIRoutes[Path][Method]["request"]
    : never
  : never;

export type ResponseType<
  Path extends keyof APIRoutes,
  Method extends string
> = Method extends keyof APIRoutes[Path]
  ? "response" extends keyof APIRoutes[Path][Method]
    ? APIRoutes[Path][Method]["response"]
    : never
  : never;
