export type ItemRaw = {
  id: number;
  url?: string;
  title?: string;
  type: "job" | "story" | "comment" | "poll";
  score: number;
  by: string;
  text?: string;
  time: number;
  kids?: number[];
};

export type Item = {
  id: number;
  url?: string;
  title?: string;
  type: "job" | "story" | "comment" | "poll";
  points: number;
  user: string;
  content?: string;
  time: number;
  comments_count?: number;
  comments?: Item[];
};

export type UserRaw = {
  id: string;
  created: string;
  karma: number;
};

export type User = {
  id: string;
  created_at: string;
  karma: number;
};
