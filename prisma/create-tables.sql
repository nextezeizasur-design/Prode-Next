-- =============================================================
-- CREATE ALL TABLES — Next World Cup Prode
-- Correr en Supabase SQL Editor
-- =============================================================

-- Enums
CREATE TYPE "MatchPhase" AS ENUM ('GROUP', 'ROUND_OF_32', 'ROUND_OF_16', 'QUARTER_FINAL', 'SEMI_FINAL', 'THIRD_PLACE', 'FINAL');
CREATE TYPE "MatchStatus" AS ENUM ('SCHEDULED', 'LIVE', 'FINISHED', 'POSTPONED', 'CANCELLED');
CREATE TYPE "NotificationType" AS ENUM ('MATCH_STARTING', 'RANK_CHANGE', 'SCORE_UPDATED', 'BADGE_EARNED', 'ANNOUNCEMENT');

-- Users
CREATE TABLE "users" (
  "id"            TEXT NOT NULL PRIMARY KEY,
  "created_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "supabase_id"   TEXT NOT NULL UNIQUE,
  "first_name"    TEXT NOT NULL,
  "last_name"     TEXT NOT NULL,
  "nickname"      TEXT NOT NULL UNIQUE,
  "email"         TEXT NOT NULL UNIQUE,
  "curso"         TEXT,
  "avatar_url"    TEXT,
  "is_admin"      BOOLEAN NOT NULL DEFAULT false,
  "is_blocked"    BOOLEAN NOT NULL DEFAULT false,
  "total_points"  INTEGER NOT NULL DEFAULT 0,
  "exact_scores"  INTEGER NOT NULL DEFAULT 0,
  "correct_winner" INTEGER NOT NULL DEFAULT 0,
  "streak"        INTEGER NOT NULL DEFAULT 0,
  "max_streak"    INTEGER NOT NULL DEFAULT 0
);

-- Teams
CREATE TABLE "teams" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "name"       TEXT NOT NULL UNIQUE,
  "short_name" TEXT NOT NULL,
  "flag_url"   TEXT NOT NULL,
  "group"      TEXT,
  "api_id"     INTEGER UNIQUE,
  "code"       TEXT UNIQUE
);

-- Matches
CREATE TABLE "matches" (
  "id"                  TEXT NOT NULL PRIMARY KEY,
  "created_at"          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "api_id"              INTEGER UNIQUE,
  "home_team_id"        TEXT NOT NULL REFERENCES "teams"("id"),
  "away_team_id"        TEXT NOT NULL REFERENCES "teams"("id"),
  "kickoff_at"          TIMESTAMPTZ NOT NULL,
  "venue"               TEXT,
  "city"                TEXT,
  "phase"               "MatchPhase" NOT NULL,
  "group_name"          TEXT,
  "match_day"           INTEGER,
  "round_name"          TEXT,
  "status"              "MatchStatus" NOT NULL DEFAULT 'SCHEDULED',
  "home_score"          INTEGER,
  "away_score"          INTEGER,
  "winner_id"           TEXT,
  "predictions_locked"  BOOLEAN NOT NULL DEFAULT false
);

CREATE INDEX "matches_kickoff_at_idx" ON "matches"("kickoff_at");
CREATE INDEX "matches_phase_idx" ON "matches"("phase");
CREATE INDEX "matches_status_idx" ON "matches"("status");

-- Predictions
CREATE TABLE "predictions" (
  "id"                    TEXT NOT NULL PRIMARY KEY,
  "created_at"            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"               TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "match_id"              TEXT NOT NULL REFERENCES "matches"("id") ON DELETE CASCADE,
  "predicted_home_score"  INTEGER NOT NULL,
  "predicted_away_score"  INTEGER NOT NULL,
  "points_earned"         INTEGER,
  "is_exact_score"        BOOLEAN,
  "is_correct_winner"     BOOLEAN,
  "week_number"           INTEGER NOT NULL,
  UNIQUE("user_id", "match_id")
);

CREATE INDEX "predictions_user_id_idx" ON "predictions"("user_id");
CREATE INDEX "predictions_match_id_idx" ON "predictions"("match_id");
CREATE INDEX "predictions_week_number_idx" ON "predictions"("week_number");

-- Semifinalist Picks
CREATE TABLE "semifinalist_picks" (
  "id"           TEXT NOT NULL PRIMARY KEY,
  "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"      TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "team_id"      TEXT NOT NULL REFERENCES "teams"("id"),
  "is_correct"   BOOLEAN,
  "bonus_points" INTEGER NOT NULL DEFAULT 0,
  UNIQUE("user_id", "team_id")
);

CREATE INDEX "semifinalist_picks_user_id_idx" ON "semifinalist_picks"("user_id");

-- Weekly Scores
CREATE TABLE "weekly_scores" (
  "id"           TEXT NOT NULL PRIMARY KEY,
  "created_at"   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"      TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "week_number"  INTEGER NOT NULL,
  "points"       INTEGER NOT NULL DEFAULT 0,
  "exact_scores" INTEGER NOT NULL DEFAULT 0,
  "rank"         INTEGER,
  UNIQUE("user_id", "week_number")
);

CREATE INDEX "weekly_scores_week_number_idx" ON "weekly_scores"("week_number");

-- Ranking History
CREATE TABLE "ranking_history" (
  "id"             TEXT NOT NULL PRIMARY KEY,
  "created_at"     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"        TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "after_match_id" TEXT NOT NULL,
  "rank"           INTEGER NOT NULL,
  "total_points"   INTEGER NOT NULL
);

CREATE INDEX "ranking_history_user_id_idx" ON "ranking_history"("user_id");

-- Badges
CREATE TABLE "badges" (
  "id"          TEXT NOT NULL PRIMARY KEY,
  "name"        TEXT NOT NULL UNIQUE,
  "description" TEXT NOT NULL,
  "icon"        TEXT NOT NULL,
  "condition"   TEXT NOT NULL
);

-- User Badges
CREATE TABLE "user_badges" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"    TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "badge_id"   TEXT NOT NULL REFERENCES "badges"("id"),
  UNIQUE("user_id", "badge_id")
);

-- Notifications
CREATE TABLE "notifications" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "user_id"    TEXT NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "type"       "NotificationType" NOT NULL,
  "title"      TEXT NOT NULL,
  "body"       TEXT NOT NULL,
  "read"       BOOLEAN NOT NULL DEFAULT false,
  "data"       JSONB
);

CREATE INDEX "notifications_user_id_read_idx" ON "notifications"("user_id", "read");

-- Announcements
CREATE TABLE "announcements" (
  "id"         TEXT NOT NULL PRIMARY KEY,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "title"      TEXT NOT NULL,
  "body"       TEXT NOT NULL,
  "active"     BOOLEAN NOT NULL DEFAULT true,
  "pinned"     BOOLEAN NOT NULL DEFAULT false,
  "expires_at" TIMESTAMPTZ
);

-- Admin Settings (singleton)
CREATE TABLE "admin_settings" (
  "id"                   TEXT NOT NULL PRIMARY KEY DEFAULT 'singleton',
  "points_exact_score"   INTEGER NOT NULL DEFAULT 3,
  "points_correct_winner" INTEGER NOT NULL DEFAULT 1,
  "points_semifinalist"  INTEGER NOT NULL DEFAULT 2,
  "tournament_active"    BOOLEAN NOT NULL DEFAULT true,
  "predictions_open"     BOOLEAN NOT NULL DEFAULT true,
  "current_week"         INTEGER NOT NULL DEFAULT 1,
  "updated_at"           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert singleton admin settings
INSERT INTO "admin_settings" ("id") VALUES ('singleton');

-- Prisma migrations table (para que Prisma no tire errores)
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id"                    VARCHAR(36) NOT NULL PRIMARY KEY,
  "checksum"              VARCHAR(64) NOT NULL,
  "finished_at"           TIMESTAMPTZ,
  "migration_name"        VARCHAR(255) NOT NULL,
  "logs"                  TEXT,
  "rolled_back_at"        TIMESTAMPTZ,
  "started_at"            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "applied_steps_count"   INTEGER NOT NULL DEFAULT 0
);
