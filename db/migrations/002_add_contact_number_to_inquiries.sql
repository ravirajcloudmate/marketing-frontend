-- Migration: add contact_number to inquiries
ALTER TABLE IF EXISTS public.inquiries
ADD COLUMN IF NOT EXISTS contact_number text;

