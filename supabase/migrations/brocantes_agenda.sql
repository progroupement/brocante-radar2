-- ============================================================
-- TABLE brocantes_agenda
-- Brocantes IDF (pas de vide-greniers) alimentée automatiquement
-- ============================================================

CREATE TABLE IF NOT EXISTS brocantes_agenda (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  nom         TEXT    NOT NULL,
  date_debut  DATE    NOT NULL,
  date_fin    DATE    NOT NULL,
  ville       TEXT    NOT NULL,
  dept        TEXT    NOT NULL,
  adresse     TEXT,
  type        TEXT    DEFAULT 'Brocante',
  recurrente  BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Lecture publique (pas besoin d'être connecté pour voir les brocantes)
ALTER TABLE brocantes_agenda ENABLE ROW LEVEL SECURITY;
CREATE POLICY "lecture publique brocantes_agenda" ON brocantes_agenda
  FOR SELECT USING (true);

-- Index sur date pour les requêtes "à venir"
CREATE INDEX IF NOT EXISTS idx_brocantes_agenda_date ON brocantes_agenda(date_debut);

-- ============================================================
-- DONNÉES INITIALES — Juin 2026
-- ============================================================
INSERT INTO brocantes_agenda (nom, date_debut, date_fin, ville, dept, adresse, type, recurrente) VALUES

-- Week-end 19-21 juin 2026
('Puces de la Porte de Vanves',         '2026-06-20', '2026-06-21', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true),
('Brocante Rue Caulaincourt',            '2026-06-20', '2026-06-21', 'Paris 18e',             '75', 'Rue Caulaincourt',                       'Brocante professionnelle', false),
('Brocante professionnelle Victor Hugo', '2026-06-19', '2026-06-21', 'Paris 16e',             '75', 'Place Victor Hugo',                      'Brocante professionnelle', false),
('Brocante collection',                  '2026-06-20', '2026-06-20', 'Noisy-le-Grand',        '93', 'Place du Marché',                        'Brocante',                 true),
('Brocante de l''été',                   '2026-06-21', '2026-06-21', 'Brunoy',                '91', 'Rue de Mandres',                         'Brocante',                 false),
('Brocante Place de la Liberté',         '2026-06-21', '2026-06-21', 'La Garenne-Colombes',   '92', 'Place de la Liberté',                   'Brocante',                 false),
('37ème Brocante de Nointel',            '2026-06-21', '2026-06-21', 'Nointel',               '95', 'Place du Château',                      'Brocante',                 false),
('Brocante de l''AS Ermont',             '2026-06-21', '2026-06-21', 'Ermont',                '95', 'Complexe sportif Rebuffat',              'Brocante',                 false),

-- Week-end 26-28 juin 2026
('Brocante professionnelle Breteuil',    '2026-06-26', '2026-06-28', 'Paris 15e',             '75', 'Avenue de Breteuil',                    'Brocante professionnelle', false),
('Brocante Rue de l''Odéon',             '2026-06-27', '2026-06-28', 'Paris 6e',              '75', 'Rue de l''Odéon',                       'Brocante professionnelle', false),
('Puces de la Porte de Vanves',         '2026-06-27', '2026-06-28', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true),
('Brocante Quartier Saint-Louis',        '2026-06-27', '2026-06-27', 'Choisy-le-Roi',         '94', 'Place de l''église — Centre-ville',     'Brocante',                 false),
('Brocante du Rotary',                   '2026-06-28', '2026-06-28', 'Maisons-Alfort',        '94', 'Rue Pierre et Marie Curie',             'Brocante caritative',      false),
('Brocante Square Silvain',              '2026-06-28', '2026-06-28', 'Asnières-sur-Seine',    '92', 'Square Silvain',                        'Brocante',                 false),
('Nouvelle Brocante Champigny',          '2026-06-28', '2026-06-28', 'Champigny-sur-Marne',   '94', 'Centre commercial Leclerc',             'Brocante',                 false),
('Brocante du Val',                      '2026-06-28', '2026-06-28', 'Athis-Mons',            '91', 'Place Jean Jaurès',                     'Brocante',                 false),
('Brocante de Coulommiers',              '2026-06-27', '2026-06-27', 'Coulommiers',           '77', 'Centre-ville',                          'Brocante',                 false),
('Brocante Bord de Seine',               '2026-06-27', '2026-06-27', 'Fontaine-le-Port',      '77', 'Bord de Seine',                         'Brocante',                 false),

-- Brocantes récurrentes de juillet (Puces de Vanves tous les week-ends)
('Puces de la Porte de Vanves',         '2026-07-04', '2026-07-05', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true),
('Puces de la Porte de Vanves',         '2026-07-11', '2026-07-12', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true),
('Puces de la Porte de Vanves',         '2026-07-18', '2026-07-19', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true),
('Puces de la Porte de Vanves',         '2026-07-25', '2026-07-26', 'Paris 14e',             '75', 'Av. Marc Sangnier & Georges Lafenestre', 'Brocante professionnelle', true);
