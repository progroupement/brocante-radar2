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
  illustration: string
  content: string
}

export const articlesChineur: Article[] = [
  {
    slug: 'preparer-visite-brocante',
    title: 'Comment bien préparer sa visite à la brocante',
    metaTitle: 'Préparer sa visite à la brocante : guide complet du chineur | Brocante Radar',
    metaDescription: 'Tout ce qu\'il faut faire avant d\'arriver à la brocante : recherches, budget, équipement, timing. Le guide du chineur préparé.',
    keywords: ['préparer visite brocante', 'conseils chineur brocante', 'que emporter brocante', 'avant brocante'],
    date: '2026-06-10',
    readTime: 6,
    category: 'Conseils pratiques',
    illustration: 'compass',
    excerpt: 'La réussite d\'une chine se joue souvent avant même d\'arriver sur place. Voici comment préparer votre visite pour maximiser vos chances de trouver la perle rare.',
    content: `
<h2>Pourquoi la préparation fait toute la différence</h2>
<p>Un chineur non préparé arrive trop tard, avec trop peu de liquide, sans savoir ce qu'il cherche. Résultat : il repart les mains vides ou avec des achats impulsifs dont il n'avait pas besoin. La brocante se mérite. Voici comment transformer chaque visite en succès.</p>

<h2>1. Définissez votre liste de recherches</h2>
<p>Avant toute chose, écrivez ce que vous cherchez. Pas un vague "quelque chose d'intéressant" — une liste précise : un secrétaire Louis-Philippe, une cafetière émaillée verte, des assiettes à soupe Digoin... Plus vous êtes précis, plus vous repérez vite dans la masse des stands.</p>
<p>Avec <strong>Brocante Radar</strong>, vous pouvez même créer votre profil chineur et être alerté quand un exposant propose exactement ce que vous cherchez.</p>

<h2>2. Faites vos devoirs sur les prix</h2>
<p>Connaître la valeur des objets qui vous intéressent est indispensable pour négocier avec confiance. Avant de partir :</p>
<ul>
<li>Consultez les ventes récentes sur les sites de vente entre particuliers</li>
<li>Regardez les prix dans les brocantes en ligne</li>
<li>Notez les fourchettes de prix pour vos objets cibles</li>
</ul>
<p>Cette connaissance vous rendra intouchable face à un exposant qui gonfle ses prix.</p>

<h2>3. Préparez votre budget en liquide</h2>
<p>La règle d'or : <strong>apportez du liquide, uniquement du liquide</strong>. La majorité des exposants n'acceptent pas la carte bancaire, et ceux qui l'acceptent peuvent avoir des problèmes de connexion. Prévoyez des billets de 5€, 10€ et 20€ pour faciliter les échanges et la négociation.</p>
<p>Fixez-vous un budget maximum avant de partir. C'est votre garde-fou contre les achats impulsifs.</p>

<h2>4. Le kit du chineur parfait</h2>
<p>Dans votre sac, emportez :</p>
<ul>
<li><strong>Un grand cabas solide</strong> — les sacs plastiques craquent au pire moment</li>
<li><strong>Une lampe de poche</strong> — pour inspecter les fonds de cartons sombres</li>
<li><strong>Un mètre ruban</strong> — pour vérifier les dimensions des meubles</li>
<li><strong>Des gants fins</strong> — utiles pour fouiller les cartons poussiéreux</li>
<li><strong>De l'eau et un en-cas</strong> — une chine peut durer plusieurs heures</li>
<li><strong>Votre téléphone chargé</strong> — pour vérifier les prix et utiliser Brocante Radar</li>
</ul>

<h2>5. Planifiez votre timing</h2>
<p>L'arrivée est cruciale. Les meilleures pièces partent dans la première heure d'ouverture. Certains chineurs arrivent même <strong>pendant l'installation</strong> (souvent autorisée par les organisateurs).</p>
<p>Règle empirique : arrivez 30 minutes avant l'ouverture officielle. Vous aurez le temps de repérer les stands les plus intéressants avant la foule.</p>

<h2>6. Repérez la brocante à l'avance</h2>
<p>Si possible, consultez le plan de la brocante au préalable. Repérez l'entrée, les allées principales, les zones de marchands professionnels (souvent en périphérie). Construisez mentalement votre itinéraire pour ne pas tourner en rond.</p>

<h2>Le jour J : les 3 premières minutes sont décisives</h2>
<p>Quand vous entrez sur le terrain, ne vous précipitez pas sur le premier stand. Faites d'abord un rapide tour du marché pour repérer les stands qui correspondent à vos recherches. Marquez mentalement leur position. Puis revenez aux plus prometteurs.</p>
<p>Cette technique "vue d'ensemble" vous évite de payer trop cher quelque chose que vous auriez trouvé moins cher 50 mètres plus loin.</p>
    `,
  },
  {
    slug: 'negocier-brocante-techniques',
    title: 'Maîtriser l\'art de la négociation à la brocante',
    metaTitle: 'Négocier à la brocante : techniques et formules qui marchent | Brocante Radar',
    metaDescription: 'Apprenez à négocier à la brocante avec confiance. Techniques, formules magiques et erreurs à éviter pour obtenir les meilleurs prix.',
    keywords: ['négocier brocante', 'comment négocier prix brocante', 'techniques négociation chineur', 'marchander brocante'],
    date: '2026-06-05',
    readTime: 7,
    category: 'Techniques',
    illustration: 'handshake',
    excerpt: 'La négociation est un art qui s\'apprend. Ces techniques éprouvées vous permettront d\'obtenir les meilleurs prix tout en gardant une relation cordiale avec les exposants.',
    content: `
<h2>L'état d'esprit du négociateur</h2>
<p>Avant de parler technique, comprenez ceci : la négociation en brocante n'est pas un combat. C'est un échange entre deux personnes qui veulent toutes les deux conclure une transaction. L'exposant veut vendre, vous voulez acheter. Cette compréhension change tout.</p>

<h2>La règle des 70%</h2>
<p>Point de départ universel : proposez environ 70% du prix affiché. Si un vase est à 30€, proposez 20-22€. Cette marge laisse de la place à la contre-proposition et aboutit souvent à un accord autour de 75-80% du prix initial.</p>
<p>Attention : ne partez pas trop bas. Proposer 30% d'un prix affiché est perçu comme insultant et ferme la porte à toute négociation.</p>

<h2>Les formules qui ouvrent les portes</h2>
<p>Certaines phrases fonctionnent mieux que d'autres :</p>
<ul>
<li><strong>"Je le prends si vous me le faites à X€"</strong> — direct et respectueux</li>
<li><strong>"Qu'est-ce que vous pouvez faire pour moi sur ce prix ?"</strong> — donne l'initiative à l'exposant</li>
<li><strong>"Je prends les deux, vous me faites un prix ?"</strong> — le lot fonctionne toujours</li>
<li><strong>"C'est le dernier billet que j'ai"</strong> — en montrant l'argent, crédible si c'est vrai</li>
</ul>

<h2>Le silence, arme secrète</h2>
<p>Après votre proposition, taisez-vous. Le silence est inconfortable — et c'est l'exposant qui va le briser en premier. Souvent avec une contre-proposition intéressante. Ne meublez pas ce silence avec des justifications : ça affaiblit votre position.</p>

<h2>Jouer la curiosité avant le prix</h2>
<p>Demandez d'abord l'histoire de l'objet : "D'où vient cette pièce ?" ou "C'est quelle époque ?". L'exposant qui parle de son objet avec passion est plus enclin à vous faire un bon prix ensuite. Vous apprenez aussi des informations utiles pour votre offre.</p>

<h2>Quand la négociation ne fonctionne pas</h2>
<p>Certains exposants ne négocient pas. Respectez-le. Deux options : accepter le prix ou passer votre chemin. Si vous repassez en fin de journée, la pièce sera peut-être encore là — et le négociant plus flexible à l'approche de la fermeture.</p>

<h2>Les erreurs fatales</h2>
<ul>
<li><strong>Montrer trop d'enthousiasme</strong> — "Oh il est magnifique !" avant de négocier, c'est suicidaire</li>
<li><strong>Critiquer l'objet</strong> — "Il est abîmé de toute façon..." crée de la défensive</li>
<li><strong>Négocier sans intention d'acheter</strong> — irrespectueux et perçu immédiatement</li>
<li><strong>Marchander sur un prix déjà raisonnable</strong> — si 5€ pour une belle pièce, achetez directement</li>
</ul>

<h2>La technique du départ feint</h2>
<p>Si l'exposant ne bouge pas sur son prix, remerciez-le poliment et commencez à partir. Dans 30% des cas, il vous appellera avec une offre améliorée. Si ce n'est pas le cas, c'est que votre prix ne correspondait pas à ses attentes — ce qui est tout à fait légitime.</p>
    `,
  },
  {
    slug: 'bons-objets-chiner-brocante',
    title: 'Les objets les plus intéressants à trouver en brocante',
    metaTitle: 'Quels objets chiner en brocante ? Guide des meilleures trouvailles | Brocante Radar',
    metaDescription: 'Linges brodés, vinyles, céramiques, jouets anciens, appareils photo... Découvrez les catégories d\'objets qui valent le détour dans les brocantes IDF.',
    keywords: ['objets chiner brocante', 'bonnes affaires brocante', 'que trouver brocante', 'objets valeur brocante idf'],
    date: '2026-05-28',
    readTime: 8,
    category: 'Guide',
    illustration: 'treasure',
    excerpt: 'Meubles, textiles, jouets, vinyles... certains objets représentent de vraies opportunités en brocante. Voici notre guide des catégories les plus rentables et les plus belles.',
    content: `
<h2>Pourquoi certains objets valent le détour</h2>
<p>En brocante, la vraie richesse se cache souvent là où personne ne regarde. Les objets "banals" pour un non-initié peuvent représenter de vraies pépites pour qui sait les reconnaître. Voici les catégories à surveiller en priorité.</p>

<h2>Les linges anciens brodés</h2>
<p>Nappes, torchons, draps et taies d'oreiller brodés sont systématiquement sous-estimés. Pourtant, un drap brodé en lin fin des années 1930 peut atteindre 50-100€ sur les marchés spécialisés. En brocante, vous les trouverez souvent à 5-15€. Cherchez les monogrammes, le travail au point de croix, les broderies de Bretagne.</p>

<h2>Les vinyles et la musique</h2>
<p>Le marché du vinyle explose. Un 33 tours de rock ou jazz des années 60-70 en bon état peut valoir 20-80€. En brocante, les cartons de disques sont souvent vendus 1-3€ la pièce. Applications utiles : Discogs pour vérifier la cote en temps réel avant d'acheter.</p>

<h2>Les céramiques et la vaisselle de marque</h2>
<p>Regardez systématiquement sous les assiettes et les pots. Les marques à repérer : Digoin, Sarreguemines, Quimper, Longchamp, Villeroy & Boch. Une assiette estampillée peut valoir 3 à 10 fois le prix d'une assiette anonyme. Les services complets sont particulièrement recherchés.</p>

<h2>Les jouets anciens</h2>
<p>Voitures Dinky Toys, soldats de plomb, poupées anciennes, Lego des années 80 — les jouets de collection atteignent des prix vertigineux dans les salles des ventes. Condition absolue : l'état. Un jouet en boîte originale en parfait état peut multiplier sa valeur par 10. Apprenez à reconnaître les marques et les séries recherchées.</p>

<h2>Les appareils photo vintage</h2>
<p>Les Leica, Rollei, Zeiss et même certains Kodak ou Agfa ont une valeur sur le marché des collectionneurs et des photographes argentiques. Testez mécaniquement (l'obturateur doit fonctionner) et vérifiez les optiques (pas de moisissures ni de buées). Un Leica M en état peut valoir plusieurs centaines d'euros.</p>

<h2>Les livres anciens et illustrés</h2>
<p>Les livres de la fin XIXe et début XXe siècle illustrés par de grands noms sont collectionnables. Cherchez aussi les tirages limités, les envois autographes, les éditions originales. Règle de base : un livre en brocante vendu 5€ peut valoir 50€ s'il s'agit d'une première édition.</p>

<h2>Les miroirs et cadres anciens</h2>
<p>Les miroirs à mercure (piqués, avec un reflet légèrement doré) et les cadres anciens dorés à la feuille d'or sont très recherchés. Un beau miroir XIXe siècle peut partir à 200-500€ chez un antiquaire. En brocante, il sera à 30-80€. Attention à la fragilité du transport.</p>

<h2>Le mobilier de style</h2>
<p>Si vous avez de la place et un moyen de transport adapté, le mobilier ancien reste l'une des meilleures affaires des brocantes. Une commode Empire ou un buffet Henri II en bon état, acheté 200€ en brocante, se revend facilement 600-800€. Inspectez les pièces, les tiroirs, l'assemblage.</p>

<h2>La règle d'or finale</h2>
<p>N'achetez que ce qui vous plaît vraiment. Le meilleur investissement est celui que vous aimez regarder chez vous, même si sa valeur ne monte pas. Et utilisez <strong>Brocante Radar</strong> pour être alerté dès qu'un exposant propose les objets spécifiques qui vous intéressent.</p>
    `,
  },
  {
    slug: 'brocante-matin-strategies',
    title: 'Pourquoi arriver tôt à la brocante change tout',
    metaTitle: 'Arriver tôt à la brocante : stratégies des chineurs professionnels | Brocante Radar',
    metaDescription: 'Les premières minutes d\'une brocante sont les plus décisives. Découvrez les stratégies des chineurs expérimentés pour ne rien rater à l\'ouverture.',
    keywords: ['arriver tôt brocante', 'ouverture brocante chineur', 'stratégie brocante matin', 'premiere heure brocante'],
    date: '2026-05-20',
    readTime: 5,
    category: 'Stratégie',
    illustration: 'clock',
    excerpt: 'La première heure d\'une brocante concentre 80% des meilleures affaires. Voici comment les chineurs expérimentés exploitent ce timing pour des trouvailles exceptionnelles.',
    content: `
<h2>La loi des premières minutes</h2>
<p>Ce n'est pas une légende : les meilleures pièces d'une brocante partent dans les 30 à 60 premières minutes. Les chineurs professionnels le savent et organisent leurs matinées en conséquence. Pour vous, cela change tout.</p>

<h2>Pourquoi si tôt ?</h2>
<p>Plusieurs raisons expliquent cette concentration des bonnes affaires en début de marché :</p>
<ul>
<li>Les exposants sont encore fatigués de l'installation et moins attentifs aux prix</li>
<li>Certains acceptent des prix plus bas le matin pour "démarrer" leur journée avec une vente</li>
<li>Les vraies bonnes pièces sont visibles avant d'être enfouies sous d'autres marchandises</li>
<li>Les brocanteurs professionnels (qui achètent pour revendre) arrivent toujours en premier</li>
</ul>

<h2>L'heure magique selon le type de brocante</h2>
<p>Les horaires varient selon les marchés :</p>
<ul>
<li><strong>Vide-greniers de particuliers</strong> : arrivez 30 minutes avant l'ouverture officielle</li>
<li><strong>Brocantes professionnelles</strong> : les marchands arrivent parfois à l'aube pour négocier entre eux avant l'ouverture au public</li>
<li><strong>Marchés aux puces permanents</strong> : le samedi matin très tôt (7h-8h) est le meilleur créneau</li>
</ul>

<h2>La technique du repérage rapide</h2>
<p>Dès votre arrivée, ne vous arrêtez pas au premier stand. Faites un tour complet rapide du marché — 5 à 10 minutes maximum. Mémorisez les stands qui ont du potentiel. Puis revenez aux plus prometteurs en commençant par ceux que vous estimez les meilleurs.</p>

<h2>Que regarder en priorité ?</h2>
<p>Pendant votre repérage, ciblez :</p>
<ul>
<li>Les cartons non ouverts (souvent des lots achetés en lot sans tri)</li>
<li>Les stands surchargés où les objets n'ont pas encore été organisés</li>
<li>Les exposants qui arrivent encore avec leurs affaires</li>
<li>Les stands tenus par des personnes âgées (souvent des héritages, des trésors inattendus)</li>
</ul>

<h2>L'avantage de la fin de marché</h2>
<p>Paradoxalement, la dernière heure peut aussi offrir de bonnes affaires. Les exposants ne veulent pas remballer et acceptent des prix très bas pour les pièces restantes. Idéal pour les objets encombrants ou peu courants. Mais les vraies pépites auront disparu depuis longtemps.</p>

<h2>Organisez votre routine du matin</h2>
<p>Les chineurs sérieux préparent leurs matinées de brocante comme des athlètes : réveil tôt, petit-déjeuner léger, tenue confortable et chaussures adaptées à marcher plusieurs heures sur un terrain parfois irrégulier. Un chineur fatigué fait de mauvais achats.</p>
    `,
  },
  {
    slug: 'budget-chinage-conseils',
    title: 'Chiner avec un petit budget : l\'art de faire des miracles',
    metaTitle: 'Chiner avec un petit budget : nos conseils pour maximiser chaque euro | Brocante Radar',
    metaDescription: 'Budget serré mais envie de chiner ? Ces stratégies vous permettent de trouver de belles pièces sans vous ruiner dans les brocantes d\'Île-de-France.',
    keywords: ['chiner petit budget', 'brocante budget limité', 'bonne affaire brocante peu cher', 'économiser brocante'],
    date: '2026-05-15',
    readTime: 6,
    category: 'Conseils pratiques',
    illustration: 'coins',
    excerpt: 'Avec 20€ ou 50€ en poche, il est tout à fait possible de revenir de la brocante avec de vraies trouvailles. Ces techniques vous aident à maximiser chaque euro.',
    content: `
<h2>Le mythe du "il faut de l'argent pour chiner"</h2>
<p>Certains pensent que la brocante est réservée aux portefeuilles bien garnis. C'est faux. Les plus grandes trouvailles de l'histoire de la brocante ont été faites pour quelques euros. La clé : connaître, être là au bon moment, et savoir négocier.</p>

<h2>Fixez votre budget avant de partir</h2>
<p>Règle absolue : décidez de votre budget maximum AVANT d'arriver. 20€ ? 50€ ? Peu importe le montant, le fait d'avoir une limite mentale évite les achats impulsifs qui vident un portefeuille en quelques stands. Prenez ce montant exact en billets et rien de plus.</p>

<h2>Les catégories petits prix à fort potentiel</h2>
<p>Certains objets sont quasi toujours bon marché mais peuvent avoir de la valeur ou être très utiles :</p>
<ul>
<li><strong>Les cartes postales anciennes</strong> : 10 centimes à 1€ pièce en brocante, belle décoration</li>
<li><strong>Les livres anciens</strong> : souvent vendus 1-2€, parfois des trésors</li>
<li><strong>Les vêtements vintage</strong> : 2-5€ pour des pièces qui font leur effet</li>
<li><strong>La petite vaisselle dépareillée</strong> : 50 centimes à 2€, parfaite pour une déco éclectique</li>
<li><strong>Les cadres sans miroir ni photo</strong> : souvent 1-3€, re-utilisables à l'infini</li>
</ul>

<h2>La stratégie du lot</h2>
<p>Proposer d'acheter plusieurs objets ensemble est l'arme la plus puissante du chineur à petit budget. "Je prends les cinq, vous me faites 8€ pour tout ?" fonctionne presque toujours, surtout en fin de journée.</p>

<h2>Arriver en fin de marché</h2>
<p>Si votre budget est serré, la dernière heure est votre alliée. Les exposants ne veulent plus transporter leurs invendus. Des objets affichés 10€ le matin se négocient facilement à 2-3€ en fin d'après-midi. Inconvénient : les meilleures pièces sont parties depuis longtemps.</p>

<h2>Les vide-greniers de particuliers vs les brocantes professionnelles</h2>
<p>Pour un petit budget, privilégiez les <strong>vide-greniers de particuliers</strong>. Les prix y sont généralement plus bas car les vendeurs ne connaissent pas la valeur exacte de leurs objets et cherchent simplement à s'en débarrasser. Les brocanteurs professionnels, eux, connaissent leurs prix et négocient moins.</p>

<h2>L'application de la règle des 3</h2>
<p>Avant d'acheter, posez-vous 3 questions : Est-ce que j'en ai vraiment besoin (ou j'en veux vraiment) ? Est-ce que le prix est juste ? Est-ce que j'ai de la place pour ça chez moi ? Si une réponse est "non", passez votre chemin.</p>
    `,
  },
  {
    slug: 'chiner-vetements-vintage',
    title: 'Guide du chinage de vêtements vintage en brocante',
    metaTitle: 'Vêtements vintage en brocante : comment trouver les meilleures pièces | Brocante Radar',
    metaDescription: 'Robes années 70, vestes en cuir vintage, pièces mode rétro... comment repérer et acheter les meilleurs vêtements vintage dans les brocantes IDF.',
    keywords: ['vêtements vintage brocante', 'mode vintage brocante paris', 'trouver habits anciens brocante', 'chiner mode rétro idf'],
    date: '2026-05-10',
    readTime: 7,
    category: 'Mode & Textile',
    illustration: 'hanger',
    excerpt: 'Les brocantes d\'Île-de-France regorgent de pièces mode vintage. Voici comment repérer les vraies pépites textiles, vérifier leur état et négocier le meilleur prix.',
    content: `
<h2>Le renouveau du vintage en mode</h2>
<p>Les vêtements vintage n'ont jamais été aussi populaires. Entre l'engouement pour la mode durable et le retour des esthétiques rétro, les brocantes sont devenues des mines d'or pour les fashionistas. Mais trouver une vraie perle dans un tas de vêtements demande méthode et œil.</p>

<h2>Les étiquettes qui font rêver</h2>
<p>Apprenez à reconnaître les marques et étiquettes d'époque :</p>
<ul>
<li><strong>Saint Laurent Rive Gauche</strong> des années 70-80 : très recherché</li>
<li><strong>Courrèges, Cardin, Ungaro</strong> vintage : collectionnables</li>
<li><strong>Levi's avec étiquette Big E</strong> (avant 1971) : jean de collection</li>
<li><strong>Marques artisanales françaises</strong> des années 50-60 : qualité exceptionnelle</li>
<li><strong>Vêtements "Made in France"</strong> avec composition laine/soie/coton naturel</li>
</ul>

<h2>Comment évaluer l'état d'un vêtement</h2>
<p>En brocante, les vêtements ne sont généralement pas lavés avant la vente. Vérification indispensable :</p>
<ul>
<li>Odeurs persistantes (moisissures, naphtaline) — difficiles à éliminer</li>
<li>Auréoles d'aisselle non lavables</li>
<li>Accrocs, déchirures, boutons manquants</li>
<li>Usure aux coudes, genoux, poignets</li>
<li>Taches sur tissu délicat (soie, velours)</li>
</ul>

<h2>Les matières à privilégier</h2>
<p>Les textiles naturels vieillissent bien et se restaurent :</p>
<ul>
<li><strong>Laine</strong> : chaleureux, durable, se nettoie à sec</li>
<li><strong>Lin</strong> : résistant, se bonifie avec le temps</li>
<li><strong>Soie</strong> : précieuse, mais fragile</li>
<li><strong>Coton</strong> : polyvalent et facile d'entretien</li>
</ul>
<p>Évitez les synthétiques des années 70-80 (polyester brillant) qui vieillissent mal et gardent les odeurs.</p>

<h2>La règle de la taille vintage</h2>
<p>Attention : les tailles d'époque ne correspondent pas aux tailles actuelles. Un vêtement étiqueté "42" des années 60 correspond souvent à un 36-38 actuel. Emportez votre mètre pour mesurer les pièces ou ayez vos mensurations en tête.</p>

<h2>Négociation et lots</h2>
<p>Les friperies en brocante pratiquent souvent des prix fixes. Mais pour les particuliers, proposez de prendre plusieurs pièces pour un tarif global. "J'en prends cinq, vous me faites 15€ ?" est une formule qui fonctionne.</p>

<h2>Entretien et restauration</h2>
<p>Après chaque achat de vêtement vintage, lavez à la main en eau froide avec un produit délicat. Pour les pièces précieuses, passez chez un teinturier spécialisé. Les vêtements vintage bien entretenus peuvent durer encore des décennies.</p>
    `,
  },
  {
    slug: 'reconnaître-qualité-brocante',
    title: 'Reconnaître la qualité d\'un objet à la brocante',
    metaTitle: 'Reconnaître la qualité en brocante : signes qui ne trompent pas | Brocante Radar',
    metaDescription: 'Bois massif ou aggloméré ? Argent massif ou métal argenté ? Apprenez à reconnaître la vraie qualité des objets pour ne jamais vous faire avoir en brocante.',
    keywords: ['reconnaître qualité brocante', 'vrai faux brocante', 'identifier objet ancien brocante', 'expert brocante conseils'],
    date: '2026-05-05',
    readTime: 8,
    category: 'Expertise',
    illustration: 'magnify',
    excerpt: 'L\'œil d\'un chineur expert se forme avec l\'expérience. Voici les signes concrets qui permettent de distinguer un objet de qualité d\'un vulgaire imposteur.',
    content: `
<h2>L'œil se forme avec la pratique</h2>
<p>On ne naît pas expert en brocante. Mais avec quelques repères clés, vous apprendrez rapidement à distinguer le vrai du faux, le qualité du toc. Voici les tests les plus fiables.</p>

<h2>Identifier le bois massif</h2>
<p>La règle d'or : regardez les tranches, les intérieurs de tiroirs et les fonds. Le <strong>bois massif</strong> montre les veines du bois de façon continue, même en section. Le <strong>placage</strong> révèle un bois différent (souvent aggloméré) sur la tranche. Le bois massif a un poids caractéristique — soulevez le meuble si possible.</p>

<h2>Argent massif vs métal argenté</h2>
<p>Cherchez les poinçons. Le <strong>poinçon Minerve</strong> (tête de femme de profil) garantit l'argent massif français. Le <strong>métal argenté</strong> (plaqué) porte souvent "EPNS" ou "Silver Plated" ou un chiffre (90, 97) indiquant l'épaisseur du placage. Avec le temps, le placage s'use aux angles — un signe de métal argenté vieilli.</p>

<h2>Céramique ancienne vs moderne</h2>
<p>Retournez la pièce. Les céramiques anciennes ont souvent un fond légèrement rugueux, des bulles d'air dans l'émail, des irrégularités de fabrication — signes d'un travail artisanal. Les reproductions modernes sont trop parfaites, trop lisses. Les poinçons et estampilles sous la base sont essentiels à déchiffrer.</p>

<h2>Les meubles d'époque vs les reproductions</h2>
<p>Plusieurs indices révèlent l'ancienneté d'un meuble :</p>
<ul>
<li><strong>Les vis</strong> : avant 1850, les vis n'étaient pas parfaitement symétriques</li>
<li><strong>L'oxydation</strong> : les parties non exposées (dessous, dos) doivent montrer un vieillissement naturel uniforme</li>
<li><strong>Les assemblages</strong> : mortaise-tenon ou queue d'aronde pour les vieux meubles, vis et agrafes pour les récents</li>
<li><strong>L'odeur</strong> : le vieux bois a une odeur caractéristique de "vieux"</li>
</ul>

<h2>Identifier le verre ancien</h2>
<p>Le verre soufflé ancien présente de légères irrégularités et des bulles d'air. Le cristal se reconnaît à son son clair quand on le fait tinter doucement. Le cristal au plomb est plus lourd que le verre ordinaire et a un éclat caractéristique.</p>

<h2>Les tableaux : quelques repères</h2>
<p>Un tableau ancien peint à l'huile craquèle de façon naturelle (craquelure régulière tout sur le tableau). Les craquelures artificielles sont irrégulières et récentes. Regardez le bord de la toile : une toile ancienne aura des fils de lin épais. Regardez le dos du tableau pour les étiquettes de galeries ou expositions.</p>

<h2>La règle des 3 signes</h2>
<p>Si vous hésitez sur un objet, cherchez au moins 3 signes cohérents qui confirment son ancienneté ou sa qualité. Un seul signe peut être trompeur. Trois signes convergents donnent une bonne confiance.</p>
    `,
  },
  {
    slug: 'itineraire-brocantes-paris',
    title: 'Les meilleures brocantes de Paris et petite couronne',
    metaTitle: 'Meilleures brocantes Paris et petite couronne IDF : guide complet | Brocante Radar',
    metaDescription: 'Tour d\'horizon des brocantes et marchés aux puces incontournables de Paris et de la petite couronne : Saint-Ouen, Montreuil, Vincennes et bien d\'autres.',
    keywords: ['meilleures brocantes paris', 'marchés puces paris', 'brocante paris petite couronne', 'agenda brocante idf'],
    date: '2026-04-28',
    readTime: 9,
    category: 'Agenda & Lieux',
    illustration: 'map',
    excerpt: 'Paris et ses environs regorgent de marchés aux puces et brocantes d\'exception. Notre sélection des adresses incontournables pour un circuit de chinage optimal.',
    content: `
<h2>L'Île-de-France, paradis du chineur</h2>
<p>L'Île-de-France concentre l'une des plus fortes densités de brocantes et marchés aux puces au monde. Entre les marchés permanents parisiens, les brocantes de village en grande couronne et les vide-greniers de quartier, les opportunités sont quasi quotidiennes. Voici les incontournables.</p>

<h2>Le marché aux puces de Saint-Ouen</h2>
<p>Le plus célèbre, le plus grand, le plus cher aussi. Les Puces de Saint-Ouen regroupent plusieurs marchés thématiques : Vernaison (brocante générale), Biron (antiquités de qualité), Dauphine (arts décoratifs), Paul Bert (mobilier design), Malik (mode vintage). Ouvert samedi, dimanche et lundi. Conseil : venez le samedi matin très tôt pour les meilleures affaires entre marchands.</p>

<h2>Les marchés de quartier parisiens</h2>
<p>Paris compte de nombreux marchés de brocante réguliers :</p>
<ul>
<li><strong>Marché d'Aligre</strong> (12e) : le plus populaire, brocante le week-end matin</li>
<li><strong>Place de la Bastille</strong> : brocante occasionnelle, très animée</li>
<li><strong>Marché aux Timbres</strong> (Champs-Élysées) : spécialisé philatélie, le week-end</li>
<li><strong>Marché Biron</strong> (Saint-Ouen) : antiquités haut de gamme</li>
</ul>

<h2>Les brocantes de petite couronne</h2>
<p>La petite couronne offre d'excellentes opportunités à des prix plus accessibles qu'à Paris :</p>
<ul>
<li><strong>Montreuil</strong> (93) : brocante populaire, excellentes affaires sur les vêtements et l'électronique vintage</li>
<li><strong>Vincennes et Saint-Mandé</strong> (94) : brocantes bourgeoises, beau mobilier</li>
<li><strong>Asnières et Clichy</strong> (92) : vide-greniers réguliers dans les quartiers résidentiels</li>
</ul>

<h2>Les brocantes de grande couronne</h2>
<p>Pour échapper à la concurrence parisienne et trouver des pépites à moindre coût :</p>
<ul>
<li><strong>Seine-et-Marne (77)</strong> : les vide-greniers ruraux recèlent souvent des meubles de ferme et du matériel agricole vintage</li>
<li><strong>Yvelines (78)</strong> : Versailles et ses environs pour le mobilier de qualité</li>
<li><strong>Essonne (91)</strong> : brocantes de ville moyenne, moins de concurrence</li>
</ul>

<h2>Comment trouver les dates</h2>
<p>Brocante Radar répertorie toutes les brocantes et vide-greniers à venir en Île-de-France. Consultez notre <a href="/brocantes-ile-de-france">agenda complet</a> mis à jour chaque semaine pour ne manquer aucun événement dans votre département.</p>

<h2>Conseils logistiques</h2>
<p>Pour les grandes brocantes :</p>
<ul>
<li>Prévoyez un grand sac solide ou même un diable (chariot) si vous cherchez du mobilier</li>
<li>Garez-vous à distance et marchez plutôt que de chercher un parking au cœur du marché</li>
<li>Venez avec un ami — quatre yeux valent mieux que deux</li>
</ul>
    `,
  },
  {
    slug: 'photographier-objets-brocante',
    title: 'Comment photographier ses trouvailles de brocante',
    metaTitle: 'Photographier ses trouvailles de brocante : guide photo pour chineurs | Brocante Radar',
    metaDescription: 'Valorisez et partagez vos trouvailles de brocante avec de belles photos. Conseils lumière, composition et mise en scène pour des photos qui font envie.',
    keywords: ['photographier objet brocante', 'photo vintage brocante', 'mettre en valeur objet ancien', 'photo chineur'],
    date: '2026-04-20',
    readTime: 5,
    category: 'Partage & Style',
    illustration: 'camera',
    excerpt: 'Une belle photo transforme une simple trouvaille en objet désirable. Ces conseils vous aident à immortaliser vos pépites de brocante avec votre smartphone.',
    content: `
<h2>Pourquoi photographier ses trouvailles ?</h2>
<p>Photographier vos objets de brocante, c'est utile pour plusieurs raisons : créer des souvenirs, partager vos découvertes, documenter votre collection, ou préparer une éventuelle revente. Et avec un smartphone moderne, de très belles photos sont à la portée de tous.</p>

<h2>La lumière naturelle, toujours la meilleure</h2>
<p>Règle numéro un : utilisez la lumière naturelle. Placez votre objet près d'une fenêtre, sans lumière directe du soleil (qui crée des ombres dures). La lumière diffuse d'un ciel couvert est idéale. Évitez absolument les flashs qui "aplattissent" les objets et effacent les détails.</p>

<h2>Le fond neutre</h2>
<p>Un fond simple met l'objet en valeur. Une grande feuille de papier blanc ou kraft posée sur une table, un tissu uni, une planche de bois brut — voilà tout ce dont vous avez besoin. Évitez les fonds chargés qui distraient l'œil.</p>

<h2>Les angles à privilégier</h2>
<ul>
<li><strong>Légèrement au-dessus et de face</strong> : pour les objets plats (vaisselle, livres, textiles)</li>
<li><strong>À hauteur d'objet</strong> : pour les sculptures, vases, bibelots — donne de la profondeur</li>
<li><strong>Détails en gros plan</strong> : les poinçons, signatures, détails d'ornement — documentez tout</li>
<li><strong>En situation</strong> : l'objet intégré dans un décor (sur une étagère, sur une table)</li>
</ul>

<h2>La mise en scène</h2>
<p>Pour les photos "lifestyle", entourez l'objet d'éléments cohérents : une vieille cafetière avec des grains de café sur une table en bois, une robe vintage suspendue à une fenêtre lumineuse, un livre ancien accompagné d'un verre de thé. Ces mises en scène racontent une histoire.</p>

<h2>Retouche minimale</h2>
<p>Un peu de luminosité, un peu de contraste, peut-être un recadrage — c'est tout ce qu'il faut. Les applications photo natives des smartphones font très bien le travail. Évitez les filtres lourds qui dénaturent les couleurs réelles de l'objet (important pour une revente éventuelle).</p>

<h2>Partager intelligemment</h2>
<p>Vos belles photos de chinages peuvent alimenter un compte Instagram, une page Facebook ou un blog personnel. C'est aussi une façon de rencontrer d'autres passionnés et de partager votre expertise. La communauté des chineurs en ligne est active et bienveillante.</p>
    `,
  },
  {
    slug: 'entretenir-objets-brocante',
    title: 'Comment entretenir et restaurer ses achats de brocante',
    metaTitle: 'Entretenir et restaurer ses achats de brocante : guide complet | Brocante Radar',
    metaDescription: 'Nettoyage, restauration, entretien : comment prendre soin de vos trouvailles de brocante pour les garder en parfait état et les transmettre.',
    keywords: ['entretenir objet brocante', 'restaurer meuble ancien', 'nettoyer achat brocante', 'conservation objet vintage'],
    date: '2026-04-15',
    readTime: 7,
    category: 'Entretien',
    illustration: 'brush',
    excerpt: 'Une trouvaille de brocante mérite d\'être bien entretenue. Ces conseils de nettoyage et de restauration vous aideront à remettre vos objets en valeur sans les abîmer.',
    content: `
<h2>La première règle : ne pas tout nettoyer</h2>
<p>Contre-intuitif mais fondamental : la <strong>patine naturelle</strong> d'un objet ancien est souvent sa plus grande valeur. Avant de nettoyer quoi que ce soit, demandez-vous si ce "sale" n'est pas en réalité une patine d'époque. Un meuble frotté trop énergiquement perd son authenticité — et sa valeur.</p>

<h2>Nettoyage du bois</h2>
<p>Pour les meubles en bois massif :</p>
<ul>
<li>Commencez par un dépoussiérage doux avec un chiffon sec ou une brosse douce</li>
<li>Pour les taches : frottez légèrement avec un chiffon légèrement humide (eau tiède sans savon)</li>
<li>Après nettoyage, nourrissez le bois avec de la cire d'abeille ou de l'huile de lin</li>
<li>N'utilisez jamais de produits industriels décapants sur du bois ancien</li>
</ul>

<h2>Argenterie et métal</h2>
<p>L'argent massif se nettoie avec :</p>
<ul>
<li>Du polish spécial argent pour les pièces très oxydées</li>
<li>Un mélange bicarbonate de soude + eau chaude pour un nettoyage doux</li>
<li>La pâte dentifrice (blanche, non gel) sur une brosse souple pour les détails fins</li>
</ul>
<p>Pour le cuivre et le bronze : le vinaigre blanc dilué puis rinçage et séchage immédiat. Mais les pièces très oxydées ont souvent une belle patine à préserver.</p>

<h2>Céramiques et porcelaine</h2>
<p>Lavage à la main à l'eau tiède avec du liquide vaisselle doux. Jamais au lave-vaisselle pour les pièces anciennes. Les craquelures de l'émail peuvent piéger les résidus de savon — rincez abondamment. Pour les taches tenaces : poser un coton imbibé d'eau oxygénée quelques heures.</p>

<h2>Textiles anciens</h2>
<p>Lavage à la main en eau froide avec un savon délicat (savon de Marseille dissous). Jamais d'essorage — étalez à plat sur une serviette. Repassez légèrement humide sur l'envers. Pour les pièces très fragiles (dentelle fine, broderie delicate), confiez à un professionnel.</p>

<h2>Livres et papier</h2>
<p>Pour les livres anciens : ne jamais les mettre en plein soleil (la lumière jaunit et fragilise). Pour les taches légères, une gomme souple peut fonctionner. Pour les couvertures en cuir : appliquez de la crème incolore pour cuir. Stocker debout, ni trop serrés ni trop lâches.</p>

<h2>Quand faire appel à un professionnel</h2>
<p>Pour les pièces de valeur ou les restaurations complexes (tableaux, meubles de style, céramiques fissurées), faites appel à un restaurateur professionnel. Une mauvaise restauration peut détruire la valeur d'une pièce. La Chambre Syndicale des Métiers d'Art recense les professionnels qualifiés.</p>
    `,
  },
]

export function getArticleChineur(slug: string): Article | undefined {
  return articlesChineur.find((a) => a.slug === slug)
}
