export type TeamName =
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
  team: TeamName;
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
  "/staff": {
    GET: {
      response: Staff[];
    };
  };
  "/meetings": {
    GET: {
      response: Meeting[];
    };
  };
  "/staff/:staffId/attendance": {
    POST: {
      request: { meetingId: string; attendanceType: AttendanceType };
      response: Staff;
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

export type ResponseType<
  Path extends keyof APIRoutes,
  Method extends string
> = Method extends keyof APIRoutes[Path]
  ? "response" extends keyof APIRoutes[Path][Method]
    ? APIRoutes[Path][Method]["response"]
    : never
  : never;
