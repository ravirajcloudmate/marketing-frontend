-- Migration: create admins table for admin sign-up/login
-- Stores company name, unique email, and salted password hash.

CREATE TABLE IF NOT EXISTS public.admins (
  id bigserial PRIMARY KEY,
  company_name text NOT NULL,
  email text NOT NULL UNIQUE,
  salt text NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admins_email_idx
  ON public.admins (email);

