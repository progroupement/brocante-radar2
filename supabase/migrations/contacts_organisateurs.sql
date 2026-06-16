-- Table pour les demandes de QR code organisateurs
CREATE TABLE IF NOT EXISTS contacts_organisateurs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nom          TEXT NOT NULL,
  email        TEXT NOT NULL,
  telephone    TEXT NOT NULL,
  message      TEXT,
  brocante_nom  TEXT,
  brocante_ville TEXT,
  brocante_date  DATE,
  brocante_id   UUID,
  traite       BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE contacts_organisateurs ENABLE ROW LEVEL SECURITY;

-- Seul le service role peut lire (admin)
CREATE POLICY "insert public contacts_organisateurs" ON contacts_organisateurs
  FOR INSERT WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_contacts_organisateurs_created ON contacts_organisateurs(created_at DESC);
