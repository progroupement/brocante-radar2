# BROCANTE RADAR — Guide de démarrage

## 1. Variables d'environnement

Créer `.env.local` à la racine du projet :

```env
NEXT_PUBLIC_SUPABASE_URL=https://XXXXXXXXXXXXXXXX.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Récupère ces valeurs dans **Supabase → Settings → API**.

---

## 2. Installation des dépendances

```bash
cd brocante-radar
npm install
```

---

## 3. Configurer Supabase

### 3a. Créer le projet Supabase
1. Va sur [supabase.com](https://supabase.com) → Nouveau projet
2. Région : West EU (Paris) pour la latence minimale

### 3b. Exécuter la migration SQL
Dans **Supabase → SQL Editor**, colle et exécute le contenu de :
`supabase/migrations/001_init.sql`

### 3c. Créer le bucket Storage
Dans **Supabase → Storage → New bucket** :
- Nom : `stands-photos`
- Cocher **Public bucket** ✓

Puis dans **Policies** du bucket, ajouter :
- SELECT : `true` (accès public en lecture)
- INSERT : `true` (upload sans auth)

### 3d. Créer le compte admin
Dans **Supabase → Authentication → Users → Add user** :
- Email : ton email admin
- Password : mot de passe fort

---

## 4. Lancer en développement

```bash
npm run dev
```

App disponible sur http://localhost:3000

---

## 5. Structure des URLs

| URL | Description |
|-----|-------------|
| `/` | Page d'accueil |
| `/organizer` | Inscription organisateur |
| `/organizer/[id]/qrcode` | QR code + PDF |
| `/organizer/[id]/dashboard` | Dashboard organisateur |
| `/stand/[token]` | Formulaire exposant (via QR) |
| `/search` | Recherche chineur |
| `/admin` | Dashboard admin (auth requis) |
| `/brocantes-ile-de-france` | Page SEO principale |
| `/brocante-paris` | Page SEO Paris |
| `/brocante-[dept]` | Pages SEO par département |

---

## 6. Déploiement Vercel

```bash
npm install -g vercel
vercel
```

Ajouter les variables d'environnement dans **Vercel → Settings → Environment Variables** :
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_APP_URL` → `https://votre-domaine.vercel.app`

Mettre à jour `next.config.ts` avec ton **project ref Supabase** dans `remotePatterns`.

---

## 7. Workflow utilisateur

### Organisateur
1. `/organizer` → Remplit le formulaire → Redirigé vers `/organizer/[id]/qrcode`
2. Télécharge le PDF A4 → L'imprime et l'affiche à l'entrée de la brocante

### Exposant (le matin de la brocante)
1. Scanne le QR code avec son smartphone
2. Arrive sur `/stand/[token]`
3. Entre son numéro de stand + mots-clés + optionnel photo
4. Clique "Publier mon stand"

### Chineur (visiteur)
1. Va sur `/search` (ou reçoit le lien)
2. Tape ce qu'il cherche (ex : "Playmobil")
3. Voit les stands correspondants avec leur numéro
4. Se dirige directement vers le bon stand !

### Admin
1. `/admin` → Se connecte avec les credentials Supabase Auth
2. Valide ou refuse les événements
3. Consulte les stats, exporte les organisateurs en CSV

---

## 8. Validation des événements

Par défaut, les événements sont en statut `en_attente`. Ils n'apparaissent
pas sur la carte publique ni dans les recherches tant qu'ils ne sont pas
passés en statut `validé` depuis le dashboard admin.

Pour passer en **validation automatique** (déconseillé au démarrage),
modifier la valeur par défaut dans la migration SQL :
```sql
statut TEXT DEFAULT 'validé'
```

---

## 9. Notes techniques

- **Leaflet** : chargé dynamiquement côté client (`dynamic` + `ssr: false`)
- **QR Code** : généré via canvas côté client avec la lib `qrcode`
- **PDF** : généré entièrement côté client avec `jspdf` (pas de serveur requis)
- **Géocodage** : Nominatim (OpenStreetMap, gratuit, 1 req/sec max)
- **Recherche** : ILIKE PostgreSQL côté Supabase (pas d'extension pg_trgm requise)
