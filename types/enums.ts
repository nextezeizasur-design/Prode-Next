export const MatchStatus = {
  SCHEDULED: "SCHEDULED",
  LIVE: "LIVE", 
  FINISHED: "FINISHED",
  POSTPONED: "POSTPONED",
  CANCELLED: "CANCELLED",
} as const;
export type MatchStatus = (typeof MatchStatus)[keyof typeof MatchStatus];

export const MatchPhase = {
  GROUP: "GROUP",
  ROUND_OF_32: "ROUND_OF_32",
  ROUND_OF_16: "ROUND_OF_16",
  QUARTER_FINAL: "QUARTER_FINAL",
  SEMI_FINAL: "SEMI_FINAL",
  THIRD_PLACE: "THIRD_PLACE",
  FINAL: "FINAL",
} as const;
export type MatchPhase = (typeof MatchPhase)[keyof typeof MatchPhase];

export const NotificationType = {
  MATCH_STARTING: "MATCH_STARTING",
  RANK_CHANGE: "RANK_CHANGE",
  SCORE_UPDATED: "SCORE_UPDATED",
  BADGE_EARNED: "BADGE_EARNED",
  ANNOUNCEMENT: "ANNOUNCEMENT",
} as const;
export type NotificationType = (typeof NotificationType)[keyof typeof NotificationType];
