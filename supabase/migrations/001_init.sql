-- ============================================================
-- BROCANTE RADAR — Migration initiale
-- ============================================================

-- Extension pour les UUIDs
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- Tables
-- ============================================================

-- Organisateurs
CREATE TABLE IF NOT EXISTS organizers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  association TEXT,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Événements (brocantes)
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organizer_id UUID REFERENCES organizers(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  adresse TEXT NOT NULL,
  ville TEXT NOT NULL,
  departement TEXT NOT NULL,
  code_postal TEXT,
  date DATE NOT NULL,
  nb_stands INT,
  statut TEXT DEFAULT 'en_attente', -- en_attente | validé | annulé
  qr_token TEXT UNIQUE DEFAULT gen_random_uuid()::TEXT,
  lat FLOAT,
  lng FLOAT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Stands (exposants)
CREATE TABLE IF NOT EXISTS stands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  nom_exposant TEXT,
  numero_stand TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Mots-clés par stand (max 20)
CREATE TABLE IF NOT EXISTS keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stand_id UUID REFERENCES stands(id) ON DELETE CASCADE,
  label TEXT NOT NULL
);

-- ============================================================
-- Index
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_events_departement ON events(departement);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_keywords_label ON keywords(label);
CREATE INDEX IF NOT EXISTS idx_stands_event_id ON stands(event_id);

-- ============================================================
-- Row Level Security
-- ============================================================

ALTER TABLE organizers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE stands ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;

-- Politique : lecture publique pour tout le monde
CREATE POLICY "Public read organizers" ON organizers FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read stands" ON stands FOR SELECT USING (true);
CREATE POLICY "Public read keywords" ON keywords FOR SELECT USING (true);

-- Politique : insertion publique (pas d'auth requise pour organisateurs et exposants)
CREATE POLICY "Public insert organizers" ON organizers FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert events" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert stands" ON stands FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert keywords" ON keywords FOR INSERT WITH CHECK (true);

-- Politique : update public (pour modification de stand)
CREATE POLICY "Public update stands" ON stands FOR UPDATE USING (true);
CREATE POLICY "Public delete keywords" ON keywords FOR DELETE USING (true);

-- Politique admin : update events (validation/refus)
CREATE POLICY "Admin update events" ON events FOR UPDATE USING (true);

-- ============================================================
-- Supabase Storage — bucket pour les photos de stands
-- ============================================================
-- À exécuter dans l'interface Supabase Storage OU via API :
-- INSERT INTO storage.buckets (id, name, public) VALUES ('stands-photos', 'stands-photos', true);
-- Politique Storage : accès public en lecture, upload sans auth
