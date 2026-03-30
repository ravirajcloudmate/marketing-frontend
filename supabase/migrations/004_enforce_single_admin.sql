-- Migration: enforce only a single admin row
-- Creates a unique index on constant value to prevent inserting more than one row.

DO $$
BEGIN
  IF (SELECT count(*) FROM public.admins) > 1 THEN
    RAISE EXCEPTION 'Cannot enforce single-admin: public.admins already has % rows. Delete extra rows and retry migration.', (SELECT count(*) FROM public.admins)
      USING ERRCODE = '23505';
  END IF;

  CREATE UNIQUE INDEX IF NOT EXISTS admins_single_row_only_idx
    ON public.admins ((1));
END $$;

