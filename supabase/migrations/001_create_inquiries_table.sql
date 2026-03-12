-- Migration: create inquiries table for contact/inquiry form
-- Compatible with PostgreSQL / Supabase

CREATE TABLE IF NOT EXISTS public.inquiries (
  id            bigserial PRIMARY KEY,
  full_name     text        NOT NULL,
  email         text        NOT NULL,
  company       text,
  trade_requirement text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS inquiries_email_idx
  ON public.inquiries (email);

CREATE INDEX IF NOT EXISTS inquiries_created_at_idx
  ON public.inquiries (created_at);

