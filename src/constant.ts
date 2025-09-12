export const CONTENT_WEBHOOKS = {
  notices: [
    "notices/create",
    "notices/update",
    "notices/delete",
    "notices/publish",
    "notices/unpublish",
  ],
  meetingMinutes: [
    "meeting-minutes/create",
    "meeting-minutes/update",
    "meeting-minutes/delete",
    "meeting-minutes/approve",
  ],
};

export const TAGS = {
  notices: "notices",
  meetingMinutes: "meeting-minutes",
  content: "content",
  dashboard: "dashboard",
  stats: "stats",
  users: "users",
  homepage: "homepage",
  search: "search",
} as const;

export const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET;
export const API_BASE_URL =
  process.env.API_BASE_URL || "http://localhost:4000/api";
