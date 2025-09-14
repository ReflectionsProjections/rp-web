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

export type LeaderboardUser = {
  userId: string;
  name: string;
  email: string;
  points: number;
  currentTier: string;
  isEligibleMerch: {
    base: boolean;
    first: boolean;
    second: boolean;
    third: boolean;
  };
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
  tags: string[];
};

export type RegistrationDraft = {
  allergies: string[];
  allergiesOther: string;
  dietaryRestrictions: string[];
  dietaryOther: string;
  educationLevel: string;
  educationOther: string;
  email: string;
  ethnicity: string[];
  ethnicityOther: string;
  gender: string;
  genderOther: string;
  graduationYear: string;
  howDidYouHear: string[];
  majors: string[];
  minors: string[];
  name: string;
  opportunities: string[];
  personalLinks: string[];
  resume: string;
  school: string;
  isInterestedMechMania: boolean;
  isInterestedPuzzleBang: boolean;
  tags: string[];
  userId: string;
};

export type Registration = {
  allergies: string[];
  dietaryRestrictions: string[];
  educationLevel: string;
  email: string;
  ethnicity: string[];
  gender: string;
  graduationYear: string;
  howDidYouHear: string[];
  majors: string[];
  minors: string[];
  name: string;
  opportunities: string[];
  personalLinks: string[];
  school: string;
  isInterestedMechMania: boolean;
  isInterestedPuzzleBang: boolean;
  tags: string[];
  hasResume: boolean;
  userId: string;
};

export type Role =
  | "USER"
  | "STAFF"
  | "ADMIN"
  | "CORPORATE"
  | "PUZZLEBANG"
  | "PENDING";

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

export type Speaker = {
  speakerId: string;
  name: string;
  title: string;
  bio: string;
  eventTitle: string;
  eventDescription: string;
  imgUrl: string;
};

export type ShiftRoleType =
  | "CLEAN_UP"
  | "DINNER"
  | "CHECK_IN"
  | "SPEAKER_BUDDY"
  | "SPONSOR_BUDDY"
  | "DEV_ON_CALL"
  | "CHAIR_ON_CALL";

export type Staff = {
  email: string;
  name: string;
  team: CommitteeType;
  attendances: Record<string, AttendanceType>;
};

export type Shift = {
  shiftId: string;
  name: string;
  role: ShiftRoleType;
  startTime: string;
  endTime: string;
  location: string;
};

export type ShiftAssignment = {
  shiftId: string;
  staffEmail: string;
  acknowledged: boolean;
  staff?: Staff;
  shifts?: Shift;
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

export type Tier = "TIER1" | "TIER2" | "TIER3" | "TIER4";
export type IconColor = "BLUE" | "RED" | "GREEN" | "PINK" | "PURPLE" | "ORANGE";
export type LeaderboardEntry = {
  rank: number;
  userId: string;
  displayName: string;
  points: number;
  currentTier: Tier;
  icon: IconColor;
};

export interface APIRoutes {
  "/attendee/emails": {
    GET: {
      response: Array<{ email: string; userId: string; name: string }>;
    };
  };
  "/attendee/id/:userId": {
    GET: {
      response: Attendee;
    };
  };
  "/attendee/redeem": {
    POST: {
      request: { userId: string; tier: Tier };
      response: { message: string };
    };
  };
  "/attendee/redeemable/:userId": {
    GET: {
      response: {
        userId: string;
        currentTier: Tier;
        redeemedTiers: Tier[];
        redeemableTiers: Tier[];
      };
    };
  };
  "/auth": {
    PUT: {
      request: { userId: string; role: Role };
      response: Role;
    };
    DELETE: {
      request: { userId: string; role: Role };
      response: never;
    };
  };
  "/auth/:role": {
    GET: {
      response: string[]; // Array of userIds
    };
  };
  "/auth/login/web": {
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
  "/auth/user/:userId": {
    GET: {
      response: RoleObject;
    };
  };
  "/auth/team": {
    GET: {
      response: RoleObject[];
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
  "/auth/sponsor/login": {
    POST: {
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
  "/leaderboard/daily": {
    GET: {
      request: {
        day: string;
        count: number;
      };
      response: {
        day: string;
        count: number;
        leaderboard: LeaderboardEntry[];
      };
    };
  };
  "/registration/draft": {
    POST: {
      request: Omit<RegistrationDraft, "userId" | "resume"> & {
        resume?: string;
      };
      response: { message: string };
    };
    GET: {
      response: RegistrationDraft;
    };
  };
  "/registration/submit": {
    POST: {
      request: Omit<Registration, "userId">;
      response: { message: string };
    };
  };
  "/registration/all": {
    GET: {
      response: Array<{
        userId: string;
        name: string;
        majors: string[];
        minors: string[];
        graduationYear: string;
        educationLevel: string;
        opportunities?: string[];
        personalLinks?: string[];
      }>;
    };
  };
  "/staff/": {
    POST: {
      request: Omit<Staff, "attendances">;
      response: Staff;
    };
  };
  "/staff": {
    GET: {
      response: Staff[];
    };
  };
  "/staff/:EMAIL": {
    DELETE: {
      request: never;
      response: never;
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
  "/speakers": {
    GET: {
      response: Speaker[];
    };
    POST: {
      request: Omit<Speaker, "speakerId">;
      response: Speaker;
    };
  };
  "/speakers/:speakerId": {
    GET: {
      response: Speaker;
    };
    PUT: {
      request: Partial<Omit<Speaker, "speakerId">>;
      response: Speaker;
    };
    DELETE: {
      request: never;
      response: never;
    };
  };
  "/s3/upload": {
    GET: {
      response: { url: string; fields: Record<string, unknown> };
    };
  };
  "/s3/download": {
    GET: {
      response: { url: string };
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
  "/staff/:EMAIL/attendance": {
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
  "/stats/attended-at-least/:N": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/check-in": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/dietary-restrictions": {
    GET: {
      response: DietaryRestrictionStats;
    };
  };
  "/stats/event/:EVENT_ID/attendance": {
    GET: {
      response: { attendanceCount: number };
    };
  };
  "/stats/merch-item/:price": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/priority-attendee": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/merch-redemption-counts": {
    GET: {
      response: Record<string, number>;
    };
  };
  "/stats/registrations": {
    GET: {
      response: { count: number };
    };
  };
  "/stats/tag-counts": {
    GET: {
      response: Record<string, number>;
    };
  };
  "/stats/tier-counts": {
    GET: {
      response: Record<string, number>;
    };
  };
  "/shifts": {
    GET: {
      response: Shift[];
    };
    POST: {
      request: Omit<Shift, "shiftId">;
      response: Shift;
    };
  };
  "/shifts/:shiftId": {
    PATCH: {
      request: Partial<Omit<Shift, "shiftId">>;
      response: Shift;
    };
    DELETE: {
      request: never;
      response: never;
    };
  };
  "/shifts/:shiftId/assignments": {
    GET: {
      response: ShiftAssignment[];
    };
    POST: {
      request: { staffEmail: string };
      response: ShiftAssignment;
    };
    DELETE: {
      request: { staffEmail: string };
      response: never;
    };
  };
  "/shifts/my-shifts": {
    GET: {
      response: ShiftAssignment[];
    };
  };
  "/shifts/:shiftId/acknowledge": {
    POST: {
      request: never;
      response: ShiftAssignment;
    };
  };
  "/leaderboard/global": {
    GET: {
      response: {
        leaderboard: Array<{
          rank: number;
          userId: string;
          displayName: string;
          points: number;
          currentTier: number;
          icon: string;
        }>;
        count: number;
      };
    };
  };
  "/leaderboard/submit": {
    POST: {
      request: {
        day: string;
        n: number;
        userIdsToPromote?: string[];
      };
      response: {
        leaderboard: Array<{
          rank: number;
          userId: string;
          displayName: string;
          points: number;
          currentTier: number;
          icon: string;
        }>;
        day: string;
        count: number;
        entriesProcessed: number;
        submissionId: string;
        submittedAt: string;
        submittedBy: string;
      };
    };
  };
  "/leaderboard/submission-status": {
    GET: {
      response: {
        exists: boolean;
        submission?: {
          submissionId: string;
          submittedAt: string;
          submittedBy: string;
          count: number;
        };
      };
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
