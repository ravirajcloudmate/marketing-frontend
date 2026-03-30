-- Migration: add status system to inquiries

ALTER TABLE IF EXISTS public.inquiries
ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new';

CREATE INDEX IF NOT EXISTS inquiries_status_idx
  ON public.inquiries (status);

