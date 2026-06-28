export type Article = {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  date: string
  readTime: number
  category: string
  excerpt: string
  illustration?: string
  content: string
}

export const articlesOrganisateur: Article[] = [
  {
    slug: 'organiser-brocante-ile-de-france',
    title: 'Comment organiser une brocante réussie en Île-de-France',
    metaTitle: 'Organiser une brocante en Île-de-France : guide complet 2026',
    metaDescription: 'Tout ce qu\'il faut savoir pour organiser une brocante réussie en Île-de-France : autorisations, logistique, communication, attractivité exposants.',
    keywords: ['organiser brocante ile-de-france', 'organiser vide-grenier paris', 'comment organiser brocante', 'brocante organisateur idf', 'créer brocante commune', 'brocante association organisateur', 'guide organisateur brocante', 'étapes organiser brocante'],
    date: '2026-05-10',
    readTime: 8,
    category: 'Organisation',
    excerpt: 'De la demande d\'autorisation en mairie jusqu\'à la communication le jour J, voici le guide complet pour réussir l\'organisation d\'une brocante en Île-de-France.',
    illustration: 'https://images.unsplash.com/photo-1670092485050-2022fbd6e88e?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Pourquoi organiser une brocante en Île-de-France ?</h2>
<p>L'Île-de-France est la région la plus peuplée de France avec plus de 12 millions d'habitants. Elle représente un bassin de chalandise exceptionnel pour tout organisateur de brocante ou vide-grenier. Les chineurs parisiens et franciliens sont nombreux, fidèles et passionnés. Organiser une brocante en IDF, c'est l'assurance d'attirer exposants et visiteurs en nombre.</p>

<h2>Étape 1 : choisir la bonne date et le bon lieu</h2>
<p>La première décision — et souvent la plus importante — concerne la date et le lieu de votre manifestation. En Île-de-France, les weekends de <strong>mars à octobre</strong> sont les plus porteurs, avec une forte demande autour du <strong>printemps (mai-juin)</strong> et de <strong>septembre</strong>. Évitez les longues périodes de congés scolaires (juillet-août) où vos exposants et visiteurs sont en vacances.</p>
<p>Pour le lieu, privilégiez :</p>
<ul>
  <li>Une place de marché ou une esplanade bien connue localement</li>
  <li>Un parking de supermarché (nécessite accord de l'enseigne)</li>
  <li>Un espace vert municipal avec bonnes conditions d'accès</li>
  <li>Un gymnase ou une salle des fêtes pour les éditions hivernales</li>
</ul>

<h2>Étape 2 : obtenir les autorisations nécessaires</h2>
<p>Toute brocante ouverte au public nécessite une <strong>déclaration préalable en mairie</strong>. Cette démarche doit être effectuée au minimum 1 mois avant la date prévue, et jusqu'à 3 mois pour les grandes manifestations. Votre dossier doit comprendre :</p>
<ul>
  <li>Le formulaire CERFA de déclaration de manifestation</li>
  <li>Un plan d'implantation des stands</li>
  <li>L'attestation d'assurance responsabilité civile</li>
  <li>Les coordonnées du responsable de la manifestation</li>
</ul>
<p>Selon la taille de votre brocante, la préfecture ou la sous-préfecture peut également être à notifier. Renseignez-vous auprès de votre mairie dès que possible.</p>

<h2>Étape 3 : planifier la logistique</h2>
<p>Une brocante bien organisée repose sur une logistique millimétrée. Voici les éléments clés à prévoir :</p>
<ul>
  <li><strong>Plan d'implantation :</strong> délimitez chaque emplacement au sol (ruban, plots, numérotation). Prévoyez les allées de circulation (minimum 3 mètres de large).</li>
  <li><strong>Accueil exposants :</strong> installez une table d'accueil visible dès l'entrée. Préparez les reçus d'emplacement et les badges exposants.</li>
  <li><strong>Signalétique :</strong> fléchez les entrées, les toilettes, la buvette, les secours.</li>
  <li><strong>Sécurité :</strong> vérifiez avec la mairie si un service d'ordre est obligatoire. Pour les grands événements (+300 personnes), un dispositif de secours est requis.</li>
</ul>

<h2>Étape 4 : recruter des exposants</h2>
<p>Sans exposants, pas de brocante. Pour attirer des vendeurs qualifiés, commencez votre communication <strong>6 à 8 semaines avant</strong> l'événement :</p>
<ul>
  <li>Publiez une annonce sur les forums locaux et groupes Facebook de votre commune</li>
  <li>Contactez les associations de chineurs et les clubs de collectionneurs locaux</li>
  <li>Utilisez <strong>Brocante Radar</strong> pour référencer votre manifestation et donner aux exposants un outil numérique pour publier leurs stands</li>
  <li>Proposez des tarifs attractifs pour les exposants réguliers (fidélisation)</li>
</ul>

<h2>Étape 5 : communiquer auprès des visiteurs</h2>
<p>Pour attirer du public, une communication multicanale est indispensable :</p>
<ul>
  <li><strong>Affiches et flyers :</strong> distribuez-les dans les commerces, bibliothèques et lieux fréquentés dès 3 semaines avant</li>
  <li><strong>Réseaux sociaux :</strong> créez un événement Facebook et partagez-le sur les groupes locaux</li>
  <li><strong>Presse locale :</strong> envoyez un communiqué à votre journal de quartier ou votre radio locale</li>
  <li><strong>Site internet de la mairie :</strong> demandez à être référencé dans le calendrier municipal</li>
</ul>

<h2>Le jour J : ce qui fait la différence</h2>
<p>Arrivez <strong>au moins 1h30 avant l'ouverture</strong> pour installer les derniers éléments et accueillir les exposants dans le calme. Prévoyez une équipe d'au moins 3 personnes : un accueil, un responsable terrain, un responsable sécurité/signalétique.</p>
<p>Pendant l'événement, circulez régulièrement dans les allées pour vous assurer que tout se passe bien. Soyez disponible pour les exposants et les visiteurs qui vous poseront des questions.</p>

<h2>Brocante Radar : votre allié numérique</h2>
<p>Brocante Radar permet aux organisateurs d'Île-de-France de <strong>numériser leur brocante</strong> avec un QR code personnalisé. Vos exposants scannent le code et publient leurs objets en temps réel. Les visiteurs trouvent ce qu'ils cherchent avant même d'arriver. Un outil gratuit qui augmente l'attractivité de votre manifestation. <a href="/contact-organisateur">Contactez-nous pour obtenir votre QR code</a>.</p>
    `,
  },
  {
    slug: 'autorisation-brocante-mairie',
    title: 'Obtenir une autorisation de brocante en mairie : guide 2026',
    metaTitle: 'Autorisation brocante mairie 2026 : démarches et formulaires',
    metaDescription: 'Guide complet pour obtenir l\'autorisation d\'organiser une brocante ou vide-grenier en mairie. CERFA, délais, assurance, obligations légales.',
    keywords: ['autorisation brocante mairie', 'déclaration vide grenier mairie', 'CERFA brocante', 'organiser vide grenier autorisation', 'démarche administrative brocante', 'permis brocante ile-de-france', 'formulaire organisateur brocante', 'délai mairie brocante'],
    date: '2026-05-18',
    readTime: 6,
    category: 'Réglementation',
    excerpt: 'Obtenir l\'autorisation pour organiser une brocante n\'est pas compliqué si l\'on connaît les démarches. Voici tout ce qu\'il faut savoir sur les formulaires, délais et obligations.',
    illustration: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Est-ce obligatoire d'avoir une autorisation pour organiser une brocante ?</h2>
<p>Oui, toute manifestation de type brocante, vide-grenier ou marché aux puces ouverte au public sur la voie publique ou dans un lieu recevant du public nécessite une <strong>autorisation préalable</strong>. Cette règle s'applique partout en France, y compris en Île-de-France, quelle que soit la taille de l'événement.</p>
<p>Organiser une brocante sans autorisation expose l'organisateur à des sanctions administratives et à une responsabilité civile non couverte en cas d'accident.</p>

<h2>Qui délivre l'autorisation ?</h2>
<p>L'autorisation est délivrée par la <strong>mairie de la commune</strong> où se déroule la manifestation. Pour les événements sur la voie publique, c'est le maire qui prend un arrêté municipal d'autorisation d'occupation temporaire du domaine public.</p>
<p>Pour les grandes manifestations rassemblant plus de 1 500 personnes, la préfecture doit également être informée.</p>

<h2>Le formulaire CERFA : lequel utiliser ?</h2>
<p>Il n'existe pas de CERFA national unique pour les brocantes. La procédure varie selon les communes. En pratique :</p>
<ul>
  <li>Certaines mairies disposent de leur propre formulaire de demande d'occupation du domaine public</li>
  <li>D'autres acceptent un courrier simple de demande</li>
  <li>Quelques communes ont digitalisé leurs démarches sur leur site internet</li>
</ul>
<p>Renseignez-vous directement auprès du <strong>service événementiel ou de la police municipale</strong> de votre mairie pour connaître la procédure exacte.</p>

<h2>Quel délai pour faire la demande ?</h2>
<p>Les délais varient selon les communes, mais voici les règles générales :</p>
<ul>
  <li><strong>Petite brocante de quartier (&lt; 50 stands) :</strong> demande 1 mois minimum avant</li>
  <li><strong>Brocante moyenne (50-200 stands) :</strong> demande 2 mois minimum avant</li>
  <li><strong>Grande manifestation (&gt; 200 stands ou &gt; 1 500 visiteurs attendus) :</strong> demande 3 mois avant, avec notification préfecture</li>
</ul>
<p>Anticipez ! Les services municipaux sont souvent surchargés, surtout au printemps et en automne, les deux grandes saisons des brocantes.</p>

<h2>Quels documents constituer votre dossier ?</h2>
<p>Un dossier complet augmente vos chances d'obtenir rapidement l'autorisation. Incluez :</p>
<ul>
  <li>Lettre de demande précisant la date, les horaires, le nombre d'exposants attendus et la nature de la manifestation</li>
  <li>Plan de masse ou plan d'implantation des stands (un simple schéma fait l'affaire pour les petites brocantes)</li>
  <li>Attestation d'assurance responsabilité civile organisateur (obligatoire)</li>
  <li>Coordonnées complètes du responsable de la manifestation</li>
  <li>Dispositif de sécurité prévu (extincteurs, trousse de secours, etc.)</li>
</ul>

<h2>L'assurance organisateur : indispensable</h2>
<p>Avant même de déposer votre demande, souscrivez une <strong>assurance responsabilité civile organisateur d'événement</strong>. La plupart des compagnies d'assurance proposent ce type de couverture à partir de 80-150 € pour une journée. Elle couvre :</p>
<ul>
  <li>Les dommages corporels aux participants et visiteurs</li>
  <li>Les dommages matériels causés au lieu de la manifestation</li>
  <li>La responsabilité de l'organisateur en cas d'incident</li>
</ul>

<h2>Cas particuliers en Île-de-France</h2>
<p>À Paris, les demandes d'occupation du domaine public pour les brocantes passent par la <strong>Direction de la Voirie et des Déplacements (DVD)</strong> de la Ville de Paris. Les délais sont souvent plus longs (2 à 3 mois) et les exigences plus strictes qu'en petite couronne.</p>
<p>Dans les communes de banlieue, rapprochez-vous de votre intercommunalité si la manifestation se déroule sur un espace partagé entre plusieurs communes.</p>

<h2>Après l'autorisation : les obligations le jour J</h2>
<p>Une fois l'autorisation obtenue, vous devez respecter plusieurs obligations le jour de la manifestation :</p>
<ul>
  <li>Tenir un registre des exposants professionnels (nom, coordonnées, numéro SIREN)</li>
  <li>S'assurer que les exposants non professionnels ne dépassent pas 2 participations par an (au-delà, le statut professionnel s'impose)</li>
  <li>Respecter les horaires autorisés par la mairie</li>
  <li>Remettre les lieux en état après l'événement</li>
</ul>
    `,
  },
  {
    slug: 'attirer-exposants-brocante',
    title: 'Comment attirer plus d\'exposants à votre brocante',
    metaTitle: 'Attirer des exposants à sa brocante : 8 stratégies efficaces',
    metaDescription: 'Recrutez plus d\'exposants pour votre brocante avec ces 8 stratégies éprouvées : communication, tarifs, fidélisation et outils numériques.',
    keywords: ['attirer exposants brocante', 'recruter exposants vide grenier', 'exposants brocante idf', 'comment remplir brocante', 'fidéliser exposants brocante', 'inscrire exposants brocante', 'plus exposants brocante', 'stand brocante ile-de-france'],
    date: '2026-04-22',
    readTime: 5,
    category: 'Stratégie',
    excerpt: 'Des stands vides, c\'est une brocante qui périclite. Voici 8 stratégies concrètes pour attirer et fidéliser vos exposants saison après saison.',
    illustration: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Pourquoi le recrutement d'exposants est crucial</h2>
<p>Une brocante réussie, c'est d'abord une brocante bien remplie. Les visiteurs reviennent si l'offre est variée et abondante. Les exposants s'inscrivent si la manifestation est connue et fréquentée. C'est un cercle vertueux qu'il faut déclencher dès la première édition.</p>

<h2>1. Commencez tôt votre communication exposants</h2>
<p>Ouvrez les inscriptions exposants <strong>8 semaines avant</strong> la date. Les bons exposants — ceux qui viennent régulièrement à plusieurs manifestations — planifient à l'avance. Si vous les contactez trop tard, leurs weekends sont déjà pris.</p>

<h2>2. Créez une page dédiée aux exposants</h2>
<p>Publiez toutes les informations essentielles en ligne : tarifs, dimensions des emplacements, horaires d'installation, conditions de participation, modalités de paiement. Plus vous êtes transparent, plus vous inspirez confiance. <a href="/exposant">Brocante Radar propose aux exposants un espace de publication de leurs stands en ligne</a>.</p>

<h2>3. Proposez des tarifs compétitifs</h2>
<p>En Île-de-France, les tarifs moyens des emplacements varient entre :</p>
<ul>
  <li>15-25 € pour un emplacement standard (6 mètres linéaires) dans les petites communes</li>
  <li>25-40 € dans les communes de la petite couronne parisienne</li>
  <li>40-70 € à Paris intra-muros et zones premium</li>
</ul>
<p>Proposez des tarifs early bird ou des réductions pour les inscriptions anticipées. Offrez un tarif réduit pour les associations et les particuliers (vs professionnels).</p>

<h2>4. Différenciez particuliers et professionnels</h2>
<p>Proposez des tarifs distincts et des emplacements séparés pour les particuliers et les professionnels. Beaucoup de chineurs préfèrent les brocantes à dominante particuliers, car les prix y sont plus attractifs. Communiquez sur le ratio.</p>

<h2>5. Utilisez les réseaux sociaux et les forums</h2>
<p>Les exposants de brocante se retrouvent sur :</p>
<ul>
  <li>Les groupes Facebook locaux ("Vide-greniers 75", "Brocante IDF", etc.)</li>
  <li>Les forums de collectionneurs spécialisés</li>
  <li>Instagram (hashtags #brocante #videgrenier #exposant)</li>
  <li>Les applications dédiées aux vide-greniers</li>
</ul>

<h2>6. Fidélisez vos exposants réguliers</h2>
<p>Un exposant satisfait est un exposant qui revient — et qui recommande votre manifestation. Instaurez un programme de fidélité : réduction dès la 3ème participation, emplacement prioritaire, emplacement réservé d'une année sur l'autre.</p>

<h2>7. Soignez l'accueil et le confort</h2>
<p>Les exposants apprécient : des horaires d'installation respectés, un accueil bienveillant le matin, la présence d'une buvette, des toilettes propres et accessibles, et une organisation visible et rassurante. Ces détails font la différence et alimentent le bouche-à-oreille positif.</p>

<h2>8. Numérisez votre brocante avec Brocante Radar</h2>
<p>Proposer un QR code Brocante Radar à vos exposants est un argument différenciant fort. Vos exposants peuvent publier leurs objets en ligne avant même d'arriver. Les visiteurs trouvent ce qu'ils cherchent et viennent directement à leur stand. Résultat : plus de ventes, des exposants heureux, une manifestation qui se démarque. <a href="/contact-organisateur">Contactez-nous pour découvrir notre offre organisateur</a>.</p>
    `,
  },
  {
    slug: 'prix-emplacements-brocante',
    title: 'Fixer le bon prix pour les emplacements de votre brocante',
    metaTitle: 'Prix emplacements brocante 2026 : combien facturer vos exposants ?',
    metaDescription: 'Comment fixer le prix des emplacements de votre brocante ou vide-grenier ? Grille tarifaire IDF, facteurs clés et stratégie de prix.',
    keywords: ['prix emplacement brocante', 'tarif vide grenier exposant', 'combien coûte emplacement brocante', 'tarification brocante organisateur', 'tarif stand brocante 2026', 'prix mètre linéaire brocante', 'fixer tarif brocante', 'emplacement brocante combien'],
    date: '2026-04-05',
    readTime: 5,
    category: 'Gestion',
    excerpt: 'Trop cher et vos emplacements ne se remplissent pas. Trop bon marché et vous ne couvrez pas vos frais. Voici comment fixer le bon prix pour votre brocante.',
    illustration: 'https://images.unsplash.com/photo-1579621970590-9d152c476153?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Les facteurs qui influencent le prix d'un emplacement</h2>
<p>Le prix d'un emplacement de brocante n'est pas arbitraire. Il résulte d'un équilibre entre plusieurs facteurs :</p>
<ul>
  <li><strong>La localisation :</strong> Paris et la petite couronne sont plus chers que la grande couronne</li>
  <li><strong>La réputation de la manifestation :</strong> une brocante reconnue justifie des tarifs plus élevés</li>
  <li><strong>La taille de l'emplacement :</strong> facturation au mètre linéaire ou à l'emplacement fixe</li>
  <li><strong>Les services inclus :</strong> tables fournies, électricité, parking exposant</li>
  <li><strong>Le profil de l'exposant :</strong> particulier vs professionnel</li>
</ul>

<h2>Grille tarifaire indicative en Île-de-France (2026)</h2>
<p>Voici les fourchettes observées sur les principales manifestations franciliennes :</p>
<ul>
  <li><strong>Emplacement particulier (6m) — Grande couronne (77, 78, 91, 95) :</strong> 15 à 25 €</li>
  <li><strong>Emplacement particulier (6m) — Petite couronne (92, 93, 94) :</strong> 20 à 35 €</li>
  <li><strong>Emplacement particulier (6m) — Paris :</strong> 35 à 60 €</li>
  <li><strong>Emplacement professionnel :</strong> majoration de 30 à 50% sur les tarifs particuliers</li>
  <li><strong>Emplacement double ou camion :</strong> 1,5 à 2x le tarif simple</li>
</ul>

<h2>Calculer votre prix de revient</h2>
<p>Avant de fixer vos tarifs, listez tous vos coûts :</p>
<ul>
  <li>Location du terrain ou de la salle</li>
  <li>Assurance organisateur</li>
  <li>Communication (affiches, réseaux sociaux, presse)</li>
  <li>Matériel (barrières, signalétique, tables si fournies)</li>
  <li>Main d'œuvre bénévole ou salariée</li>
  <li>Frais divers (piles pour la caisse, sacs plastique, etc.)</li>
</ul>
<p>Divisez ce total par le nombre d'emplacements prévus. Le résultat est votre <strong>prix de revient minimum</strong> par emplacement. Ajoutez une marge de 20-30% pour couvrir les imprévus et dégager un bénéfice si c'est votre objectif.</p>

<h2>Tarification modulée : une bonne pratique</h2>
<p>Proposez plusieurs niveaux de prix selon la situation de l'emplacement : les emplacements en coin d'allée ou face à l'entrée principale peuvent être facturés 10-20% plus cher. Cela permet aussi de créer de la valeur perçue sans augmenter votre tarif de base.</p>

<h2>La question de l'acompte</h2>
<p>Pour sécuriser vos inscriptions et éviter les défections le jour J, demandez un <strong>acompte de 30 à 50%</strong> à la réservation, le solde étant réglé à l'arrivée. Précisez clairement votre politique d'annulation dans vos conditions de participation.</p>

<h2>Modes de paiement acceptés</h2>
<p>En 2026, les exposants s'attendent à pouvoir payer par virement bancaire, carte bancaire ou chèque. Évitez d'imposer le seul paiement en espèces, qui peut freiner les inscriptions. Des solutions comme SumUp ou PaybyLink facilitent le paiement en ligne dès l'inscription.</p>
    `,
  },
  {
    slug: 'qr-code-brocante-numerique',
    title: 'Numériser sa brocante avec un QR code : le guide complet',
    metaTitle: 'QR code brocante : comment numériser votre manifestation en 2026',
    metaDescription: 'Découvrez comment le QR code transforme l\'organisation de votre brocante. Exposants connectés, visiteurs guidés, stands visibles en temps réel.',
    keywords: ['qr code brocante', 'numeriser brocante', 'brocante digitale', 'application brocante organisateur', 'stands en ligne brocante', 'brocante numérique exposant', 'afficher stand QR code', 'moderniser brocante technologie'],
    date: '2026-03-15',
    readTime: 5,
    category: 'Numérique',
    excerpt: 'Le QR code révolutionne l\'expérience brocante pour les organisateurs, les exposants et les visiteurs. Découvrez comment en tirer parti pour votre prochaine manifestation.',
    illustration: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d6?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Qu'est-ce qu'une brocante numérique ?</h2>
<p>Une brocante numérique, c'est une manifestation traditionnelle enrichie d'outils digitaux qui améliorent l'expérience de tous les participants. Concrètement, cela signifie que les <strong>exposants publient leurs objets en ligne avant et pendant la brocante</strong>, et que les visiteurs peuvent rechercher un objet précis et savoir exactement à quel stand le trouver.</p>

<h2>Comment fonctionne le QR code organisateur ?</h2>
<p>Avec <strong>Brocante Radar</strong>, le fonctionnement est simple :</p>
<ol>
  <li>L'organisateur contacte Brocante Radar et reçoit un <strong>QR code unique</strong> lié à sa manifestation</li>
  <li>Ce QR code est imprimé et remis à chaque exposant lors de son inscription ou le jour J</li>
  <li>L'exposant scanne le QR code avec son smartphone, accède à son espace stand et publie ses photos et mots-clés</li>
  <li>Les visiteurs cherchent sur <a href="/search">brocanteradar.fr</a> et trouvent instantanément le stand qui a l'objet qu'ils cherchent</li>
</ol>

<h2>Les bénéfices pour l'organisateur</h2>
<ul>
  <li><strong>Visibilité accrue :</strong> votre brocante est référencée sur Brocante Radar et visible des milliers de chineurs franciliens</li>
  <li><strong>Différenciation :</strong> vous proposez une expérience moderne que les autres manifestations n'offrent pas encore</li>
  <li><strong>Attractivité exposants :</strong> les exposants choisissent les brocantes où ils vendent le mieux — guidez les visiteurs vers eux</li>
  <li><strong>Bouche-à-oreille positif :</strong> une brocante bien organisée et numérisée génère des retours enthousiastes</li>
</ul>

<h2>Les bénéfices pour les exposants</h2>
<ul>
  <li>Leurs objets sont visibles avant même l'ouverture de la brocante</li>
  <li>Les visiteurs ciblés arrivent directement à leur stand — moins d'attente, plus de ventes</li>
  <li>Pas d'application à télécharger : tout fonctionne via le navigateur du smartphone</li>
  <li>Publication en 3 minutes avec photos et description</li>
</ul>

<h2>Les bénéfices pour les visiteurs</h2>
<ul>
  <li>Ils savent à l'avance ce qu'ils vont trouver sur la brocante</li>
  <li>Ils peuvent localiser précisément le stand qui vend l'objet recherché</li>
  <li>Ils gagnent un temps précieux et vivent une meilleure expérience</li>
</ul>

<h2>Comment obtenir votre QR code Brocante Radar ?</h2>
<p>C'est simple : <a href="/contact-organisateur">remplissez le formulaire de contact organisateur</a> sur Brocante Radar. Précisez les dates et le lieu de votre manifestation. Notre équipe vous recontacte sous 48h pour créer votre espace organisateur et générer votre QR code personnalisé.</p>
<p>Le service est actuellement en phase de lancement et proposé gratuitement aux organisateurs partenaires de la première heure.</p>

<h2>Conseils pour maximiser l'adoption par vos exposants</h2>
<ul>
  <li>Glissez le QR code dans le kit d'accueil remis à chaque exposant le matin</li>
  <li>Expliquez le fonctionnement en 2 phrases sur votre fiche de bienvenue exposant</li>
  <li>Proposez une démonstration rapide depuis votre table d'accueil</li>
  <li>Encouragez les exposants à publier tôt (la veille ou le matin avant ouverture)</li>
</ul>
    `,
  },
  {
    slug: 'promouvoir-brocante-reseaux-sociaux',
    title: 'Promouvoir sa brocante sur les réseaux sociaux : stratégie 2026',
    metaTitle: 'Réseaux sociaux brocante : comment promouvoir sa manifestation',
    metaDescription: 'Facebook, Instagram, TikTok : guide complet pour promouvoir votre brocante sur les réseaux sociaux et attirer plus de visiteurs et d\'exposants.',
    keywords: ['promouvoir brocante facebook', 'instagram brocante', 'communication brocante reseaux sociaux', 'publicité brocante en ligne', 'marketing brocante', 'affiche brocante', 'annonce brocante gratuite', 'attirer visiteurs brocante'],
    date: '2026-03-28',
    readTime: 6,
    category: 'Communication',
    excerpt: 'Les réseaux sociaux sont devenus le premier canal de communication pour les brocantes. Voici comment les utiliser efficacement pour remplir vos stands et attirer les visiteurs.',
    illustration: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Pourquoi les réseaux sociaux sont incontournables pour votre brocante</h2>
<p>En 2026, plus de 80% des Français de moins de 65 ans utilisent au moins un réseau social. C'est là que se trouvent vos futurs visiteurs et exposants. Ignorer les réseaux sociaux, c'est passer à côté de votre principal canal d'acquisition gratuit.</p>

<h2>Facebook : toujours le roi pour les événements locaux</h2>
<p>Malgré son vieillissement, Facebook reste l'outil numéro 1 pour la promotion d'événements locaux. Les groupes Facebook de quartier ou de ville sont très actifs et constituent un canal de communication exceptionnel.</p>
<p>Ce qu'il faut faire :</p>
<ul>
  <li>Créez un <strong>événement Facebook</strong> dès l'ouverture des inscriptions, avec toutes les infos pratiques</li>
  <li>Partagez l'événement dans tous les groupes locaux pertinents ("Habitants de [ville]", "Brocante IDF", "Vide-greniers 92", etc.)</li>
  <li>Publiez des updates régulières (compte à rebours, annonces exposants, photos des précédentes éditions)</li>
  <li>Répondez aux commentaires rapidement — la réactivité inspire confiance</li>
</ul>

<h2>Instagram : pour l'ambiance et l'attrait visuel</h2>
<p>Instagram est parfait pour montrer l'ambiance de votre brocante et attirer les visiteurs qui aiment le vintage et la décoration. Publiez :</p>
<ul>
  <li>Des photos d'objets photographiés sur vos précédentes éditions</li>
  <li>Des stories "compte à rebours" à J-7 et J-3</li>
  <li>Des Reels montrant les meilleures trouvailles de chineurs</li>
  <li>Des mentions de vos exposants (repartage de leurs publications)</li>
</ul>
<p>Utilisez les hashtags : #brocante #videgrenier #chineur #vintage #brocanteIDF #brocanteparis #chineuseuse #antiquites #depotdevente</p>

<h2>TikTok : le nouveau canal qui monte</h2>
<p>TikTok est particulièrement efficace pour toucher un public jeune (25-40 ans) passionné de vintage et de seconde main. Les vidéos de type "ce que j'ai trouvé à la brocante" génèrent des millions de vues. Si vous avez du talent vidéo, c'est une opportunité à saisir.</p>

<h2>Planifiez votre calendrier éditorial</h2>
<p>Pour une brocante le dimanche :</p>
<ul>
  <li><strong>J-45 :</strong> annonce officielle, ouverture inscriptions exposants</li>
  <li><strong>J-21 :</strong> rappel inscriptions exposants + premières infos visiteurs</li>
  <li><strong>J-14 :</strong> mise en avant de quelques exposants confirmés</li>
  <li><strong>J-7 :</strong> compte à rebours, infos pratiques (parking, accès, horaires)</li>
  <li><strong>J-1 (samedi) :</strong> reminder "Demain c'est le jour !"</li>
  <li><strong>Jour J :</strong> stories en direct depuis la brocante</li>
  <li><strong>J+1 :</strong> photos de l'événement, remerciements, teaser prochain édition</li>
</ul>

<h2>La publicité payante : vaut-elle l'investissement ?</h2>
<p>Pour les organisateurs qui veulent aller plus loin, la publicité Facebook et Instagram permet de cibler précisément les habitants d'un rayon de 20-30 km autour de votre brocante. Un budget de 30-50 € peut générer plusieurs centaines de contacts qualifiés. C'est un investissement rentable pour les manifestations de taille moyenne à grande.</p>
    `,
  },
  {
    slug: 'securite-assurance-brocante',
    title: 'Sécurité et assurance lors d\'une brocante : ce qu\'il faut savoir',
    metaTitle: 'Assurance brocante organisateur : obligations et couvertures 2026',
    metaDescription: 'Quelles assurances sont obligatoires pour organiser une brocante ? Comment garantir la sécurité des visiteurs et des exposants ? Le guide complet.',
    keywords: ['assurance brocante organisateur', 'securite brocante', 'responsabilite civile brocante', 'obligation assurance vide grenier', 'assurance RC brocante', 'sécurité incendie brocante', 'secours brocante', 'obligations légales organisateur'],
    date: '2026-02-20',
    readTime: 6,
    category: 'Réglementation',
    excerpt: 'Responsabilité civile, sécurité incendie, dispositif de secours : voici toutes les obligations légales en matière de sécurité pour les organisateurs de brocantes.',
    illustration: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>L'assurance responsabilité civile organisateur : obligatoire</h2>
<p>Toute personne ou association organisant une brocante ouverte au public doit obligatoirement souscrire une <strong>assurance responsabilité civile organisateur d'événement</strong>. Cette assurance couvre les dommages corporels et matériels causés à des tiers (visiteurs, exposants, riverains) dans le cadre de la manifestation.</p>
<p>Sans cette assurance, vous êtes personnellement responsable de tous les dommages pouvant survenir. En cas d'accident grave (chute, incendie, rixe), les conséquences financières peuvent être catastrophiques.</p>

<h2>Où souscrire et combien ça coûte ?</h2>
<p>De nombreuses compagnies d'assurance proposent des contrats événementiels temporaires :</p>
<ul>
  <li>Les mutuelles et assureurs généraux (MAIF, MAAF, AXA, Groupama...)</li>
  <li>Les assureurs spécialisés dans les associations et événements</li>
  <li>Les courtiers en ligne spécialisés dans les événements</li>
</ul>
<p>Le tarif varie selon la taille de l'événement : comptez <strong>80 à 200 €</strong> pour une journée, pour une manifestation de 50 à 300 stands. Au-delà, les tarifs sont sur devis.</p>

<h2>Le dispositif de sécurité : ce que la loi impose</h2>
<p>Pour les établissements recevant du public (ERP), les obligations de sécurité incendie sont strictes :</p>
<ul>
  <li><strong>Extincteurs :</strong> 1 extincteur pour 200 m² minimum, vérifiés et datés</li>
  <li><strong>Issues de secours :</strong> bien signalées et dégagées</li>
  <li><strong>Largeur des allées :</strong> minimum 3 mètres pour la circulation, davantage pour les voies de secours</li>
  <li><strong>Dispositif de premiers secours :</strong> trousse de secours obligatoire, et personnel formé aux gestes de premiers secours recommandé</li>
</ul>

<h2>Les grands rassemblements : obligations renforcées</h2>
<p>Pour les manifestations rassemblant plus de 1 500 personnes en simultané, la réglementation impose :</p>
<ul>
  <li>Un service de sécurité privé agréé</li>
  <li>Un dispositif prévisionnel de secours (DPS) avec du personnel médical</li>
  <li>Une déclaration préfectorale</li>
  <li>Éventuellement un plan de circulation validé par les services de voirie</li>
</ul>

<h2>Les exposants doivent-ils être assurés ?</h2>
<p>Les exposants professionnels (qui vendent à titre commercial) doivent être couverts par leur propre assurance professionnelle. Pour les particuliers, c'est recommandé mais pas toujours obligatoire. En tant qu'organisateur, précisez dans vos conditions de participation que chaque exposant est responsable de ses biens et de son emplacement.</p>

<h2>Après un incident : que faire ?</h2>
<p>En cas d'incident lors de votre brocante, la procédure est la suivante :</p>
<ol>
  <li>Sécuriser la zone et appeler les secours si nécessaire (15, 18 ou 112)</li>
  <li>Documenter l'incident (photos, témoins, heure exacte)</li>
  <li>Remplir un rapport d'incident</li>
  <li>Déclarer le sinistre à votre assureur dans les 5 jours ouvrés</li>
</ol>
    `,
  },
  {
    slug: 'checklist-jour-j-brocante',
    title: 'Checklist organisateur : tout faire le jour J de votre brocante',
    metaTitle: 'Checklist organisateur brocante : le jour J sans stress',
    metaDescription: 'La checklist complète de l\'organisateur de brocante pour le jour J : de l\'arrivée à la fermeture, ne rien oublier et gérer sereinement votre manifestation.',
    keywords: ['checklist organisateur brocante', 'jour j brocante', 'organisation brocante matin', 'gérer brocante jour evenement', 'liste organisation brocante', 'planifier brocante', 'gestion brocante le jour même', 'que prévoir brocante'],
    date: '2026-01-30',
    readTime: 5,
    category: 'Organisation',
    excerpt: 'Le jour J d\'une brocante peut vite devenir chaotique sans préparation. Cette checklist vous guide de l\'arrivée du matin jusqu\'à la fermeture en soirée.',
    illustration: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>La veille : dernière vérification</h2>
<ul>
  <li>Confirmer les équipes et les rôles de chacun</li>
  <li>Vérifier que tous les exposants ont bien reçu les informations pratiques (heure d'arrivée, plan d'implantation)</li>
  <li>Préparer le matériel : caisse, reçus, stylos, ruban adhésif, poteaux de signalétique</li>
  <li>Vérifier la météo et prévoir un plan B si nécessaire</li>
  <li>Charger tous les téléphones et appareils photo</li>
</ul>

<h2>Le matin : installation (J-2h avant ouverture)</h2>
<ul>
  <li>Arriver en premier sur le terrain</li>
  <li>Délimiter les emplacements s'ils ne l'ont pas été la veille</li>
  <li>Installer la table d'accueil exposants à l'entrée</li>
  <li>Mettre en place la signalétique (entrée, buvette, toilettes, secours)</li>
  <li>Vérifier les extincteurs et le matériel de premiers secours</li>
  <li>Briefer l'équipe sur les rôles et les procédures d'urgence</li>
</ul>

<h2>Accueil des exposants (J-1h30 à ouverture)</h2>
<ul>
  <li>Accueillir chaque exposant avec le sourire</li>
  <li>Remettre le QR code Brocante Radar à chaque exposant</li>
  <li>Encaisser les soldes ou l'intégralité selon votre politique</li>
  <li>Attribuer les emplacements selon le plan</li>
  <li>Noter les absents et décider si leurs emplacements sont revendus</li>
</ul>

<h2>Pendant la brocante (ouverture)</h2>
<ul>
  <li>Surveiller la fluidité de la circulation dans les allées</li>
  <li>Gérer les plaintes et litiges rapidement et calmement</li>
  <li>Faire une ronde toutes les heures pour s'assurer que tout va bien</li>
  <li>Prendre des photos pour la communication post-événement</li>
  <li>Gérer les éventuels retardataires ou annulations</li>
</ul>

<h2>Fermeture et rangement</h2>
<ul>
  <li>Annoncer la fermeture 30 min avant la fin</li>
  <li>Accompagner le départ des exposants et vérifier les emplacements</li>
  <li>Ramasser tous les déchets et remettre les lieux en état</li>
  <li>Récupérer le matériel de signalétique</li>
  <li>Faire un bilan rapide avec l'équipe</li>
  <li>Envoyer un message de remerciement aux exposants le soir même</li>
</ul>

<h2>Le bilan post-événement (dans la semaine)</h2>
<ul>
  <li>Comptabiliser les recettes et les dépenses</li>
  <li>Recueillir les avis des exposants (questionnaire court)</li>
  <li>Publier les photos sur les réseaux sociaux</li>
  <li>Annoncer la prochaine édition si elle est programmée</li>
</ul>
    `,
  },
  {
    slug: 'meilleur-mois-brocante-idf',
    title: 'Quel est le meilleur mois pour organiser une brocante en IDF ?',
    metaTitle: 'Meilleure période brocante IDF : quel mois choisir pour 2026 ?',
    metaDescription: 'Printemps, automne ou été ? Découvrez les meilleures périodes pour organiser une brocante en Île-de-France selon la météo, les vacances scolaires et la fréquentation.',
    keywords: ['meilleur mois brocante', 'quand organiser brocante ile de france', 'calendrier brocante idf', 'periode brocante paris', 'brocante printemps', 'brocante automne', 'meilleure saison brocante', 'date brocante 2026'],
    date: '2026-01-15',
    readTime: 5,
    category: 'Stratégie',
    excerpt: 'La météo, les vacances scolaires et les habitudes des chineurs influencent fortement la réussite de votre brocante. Voici comment choisir la meilleure date.',
    illustration: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Les saisons des brocantes en Île-de-France</h2>
<p>En Île-de-France, la saison des brocantes s'étend principalement de <strong>mars à novembre</strong>. Juillet et août sont des mois très calmes pour les brocantes car une grande partie des Franciliens est en vacances.</p>

<h2>Printemps (mars-juin) : la haute saison</h2>
<p>Le printemps est de loin <strong>la meilleure période</strong> pour organiser une brocante en IDF :</p>
<ul>
  <li>Météo agréable et jours plus longs</li>
  <li>Forte envie de "faire le ménage de printemps" — beaucoup de particuliers vendent</li>
  <li>Forte demande des visiteurs après l'hiver</li>
  <li>Idéal pour les objets de jardin, mobilier extérieur, décoration</li>
</ul>
<p><strong>Mois recommandés :</strong> mai et juin sont les pics de fréquentation. Mars et avril sont excellents mais nécessitent de surveiller la météo.</p>

<h2>Été (juillet-août) : à éviter</h2>
<p>Ces deux mois sont déconseillés pour organiser une brocante en IDF :</p>
<ul>
  <li>40-50% des Franciliens sont absents en juillet-août</li>
  <li>La chaleur peut décourager exposants et visiteurs</li>
  <li>La concurrence est faible... pour une bonne raison</li>
</ul>
<p>Exception : si votre commune est une destination touristique ou si vous êtes en zone rurale avec une population estivale.</p>

<h2>Automne (septembre-octobre) : la seconde haute saison</h2>
<p>Septembre et octobre sont les mois de la <strong>rentrée des brocantes</strong>. Après la pause estivale, la demande repart fortement :</p>
<ul>
  <li>Les Franciliens reviennent de vacances avec envie de chiner</li>
  <li>La météo est encore agréable</li>
  <li>Les chineurs cherchent des objets pour l'intérieur (automne/hiver)</li>
</ul>
<p><strong>Mois recommandés :</strong> septembre est le meilleur mois automnal. Octobre reste bon mais la météo devient plus aléatoire.</p>

<h2>Hiver (novembre-février) : possible en intérieur</h2>
<p>L'hiver n'est pas idéal pour les brocantes en plein air. Mais si vous disposez d'une grande salle ou d'un espace couvert, c'est une période intéressante :</p>
<ul>
  <li>Peu de concurrence avec d'autres brocantes</li>
  <li>Les visiteurs cherchent des cadeaux de Noël (novembre-décembre)</li>
  <li>La demande pour les objets vintage et de collection reste forte</li>
</ul>

<h2>Les jours à éviter absolument</h2>
<ul>
  <li>Les jours fériés très fréquentés (1er mai, 14 juillet, 15 août)</li>
  <li>Les weekends de départ/retour de vacances scolaires</li>
  <li>Les weekends de grands événements sportifs ou culturels régionaux</li>
  <li>Les périodes d'élections (les salles des fêtes sont souvent indisponibles)</li>
</ul>

<h2>Le dimanche plutôt que le samedi</h2>
<p>En Île-de-France, les brocantes du dimanche attirent généralement 30 à 50% de visiteurs en plus que celles du samedi. Les Franciliens réservent souvent leur dimanche matinal aux sorties locales. Commencez à 7h ou 8h pour les lève-tôt et fermez vers 14h ou 15h.</p>
    `,
  },
  {
    slug: 'bilan-apres-brocante',
    title: 'Comment faire un bilan après votre brocante et progresser',
    metaTitle: 'Bilan organisateur brocante : comment s\'améliorer après l\'événement',
    metaDescription: 'Analysez votre brocante pour progresser : satisfaction exposants, recettes, fréquentation, problèmes rencontrés. Le guide du bilan post-événement.',
    keywords: ['bilan brocante organisateur', 'améliorer brocante', 'retour experience brocante', 'analyse brocante apres evenement', 'évaluer brocante résultats', 'satisfaction exposants brocante', 'reconduite brocante', 'fidélisation brocante organisateur'],
    date: '2026-02-05',
    readTime: 4,
    category: 'Gestion',
    excerpt: 'Chaque brocante est une leçon. Voici comment analyser votre manifestation pour progresser, fidéliser vos exposants et améliorer chaque nouvelle édition.',
    illustration: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
    content: `
<h2>Pourquoi faire un bilan après chaque brocante ?</h2>
<p>Les meilleurs organisateurs de brocantes ont un point commun : ils analysent systématiquement chaque manifestation. Ce bilan, fait dans les 48h suivant l'événement, permet d'identifier les points forts à conserver et les problèmes à corriger pour la prochaine édition.</p>

<h2>Les données à collecter le jour J</h2>
<p>Pour un bilan pertinent, il faut collecter des données pendant l'événement :</p>
<ul>
  <li>Nombre d'exposants présents vs inscrits (taux de présence)</li>
  <li>Nombre de visiteurs estimé (comptage à l'entrée si possible)</li>
  <li>Heure de pointe de fréquentation</li>
  <li>Incidents survenus (même mineurs)</li>
  <li>Commentaires spontanés des exposants et visiteurs</li>
</ul>

<h2>Le bilan financier</h2>
<p>Construisez un tableau simple :</p>
<ul>
  <li><strong>Recettes :</strong> droits d'emplacement, buvette (si vous la gérez), partenariats éventuels</li>
  <li><strong>Dépenses :</strong> location terrain, assurance, communication, matériel, personnel</li>
  <li><strong>Résultat net :</strong> recettes − dépenses</li>
  <li><strong>Coût par emplacement :</strong> total dépenses ÷ nombre d'emplacements</li>
</ul>
<p>Ce tableau vous permettra d'ajuster vos tarifs pour la prochaine édition si nécessaire.</p>

<h2>Le questionnaire exposants</h2>
<p>Envoyez un court questionnaire à vos exposants dans les 48h. Pas plus de 5 questions :</p>
<ol>
  <li>Êtes-vous satisfait(e) de votre participation ? (1-5)</li>
  <li>L'organisation était-elle à la hauteur de vos attentes ? (1-5)</li>
  <li>Le nombre de visiteurs vous a-t-il semblé suffisant ? (oui/non)</li>
  <li>Reviendriez-vous à notre prochaine brocante ? (oui/non/peut-être)</li>
  <li>Un commentaire ou une suggestion ? (texte libre)</li>
</ol>

<h2>Analyser les avis en ligne</h2>
<p>Consultez les commentaires sur votre page Facebook, les mentions sur Instagram et les groupes locaux où votre brocante a été mentionnée. Les retours non sollicités sont souvent les plus honnêtes.</p>

<h2>Les 3 questions clés du bilan</h2>
<ol>
  <li><strong>Qu'est-ce qui a bien marché ?</strong> — Identifiez les éléments à reproduire absolument</li>
  <li><strong>Qu'est-ce qui a moins bien marché ?</strong> — Sans filtre ni excuses</li>
  <li><strong>Qu'est-ce que je ferais différemment ?</strong> — Actions concrètes pour la prochaine édition</li>
</ol>

<h2>Capitaliser sur votre brocante pour la suivante</h2>
<p>Avant que les souvenirs s'estompent, lancez les inscriptions pour votre prochaine édition. Un exposant satisfait qui reçoit l'annonce de la prochaine manifestation dans la semaine aura tendance à s'inscrire immédiatement. Gardez l'élan !</p>
    `,
  },
]

export function getArticleOrganisateur(slug: string): Article | undefined {
  return articlesOrganisateur.find((a) => a.slug === slug)
}
