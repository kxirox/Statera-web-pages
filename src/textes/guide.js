// Textes de la page guide.html — une entrée = une clé = [français, English].
// Modifier UN texte : toujours les DEUX langues, puis « node scripts/site.mjs build ».
export default {
  "guide.guide-d-utilisation-de-stateri": [
    "Guide d'utilisation de Stateri : démarrer, saisir, détecteurs, sauvegarde — Stateri",
    "Stateri user guide: getting started, entering data, detectors, backup — Stateri",
  ],
  "guide.pas-a-pas-demarrer-avec": [
    "Pas à pas : démarrer avec Stateri, saisir vos dépenses (à la main, à la voix, par import), détecteurs d'abonnements et de virements internes, sauvegarde sur votre Google Drive.",
    "Step by step: getting started with Stateri, entering your expenses (by hand, by voice, by import), subscription and internal-transfer detectors, backup to your Google Drive.",
  ],
  "guide.guide-d-utilisation-de-stateri-2": [
    "Guide d'utilisation de Stateri",
    "Stateri user guide",
  ],
  "guide.comment-commencer-avec-stateri": [
    "Comment commencer avec Stateri ?",
    "How do I get started with Stateri?",
  ],
  "guide.ouvrez-app-stateri-fr-dans": [
    "Ouvrez app.stateri.fr dans votre navigateur, connectez-vous avec votre compte Google, puis ajoutez vos comptes bancaires avec leur solde de départ. Rien n'est à installer pour commencer.",
    "Open app.stateri.fr in your browser, sign in with your Google account, then add your bank accounts with their starting balance. Nothing needs to be installed to get started.",
  ],
  "guide.qu-est-ce-que-le": [
    "Qu'est-ce que le scanner d'abonnement ?",
    "What is the subscription scanner?",
  ],
  "guide.c-est-un-detecteur-qui": [
    "C'est un détecteur qui tourne sur votre appareil. Il cherche dans votre historique les prélèvements du même montant exact qui reviennent au même rythme, repère une hausse de prix quand un montant voisin remplace l'ancien, et signale un abonnement qui s'est arrêté. Vous vérifiez les opérations retenues avant d'en faire une charge récurrente.",
    "It is a detector that runs on your device. It looks through your history for charges of the exact same amount that come back at the same rhythm, spots a price increase when a nearby amount replaces the old one, and flags a subscription that has stopped. You check the transactions it picked before turning them into a recurring item.",
  ],
  "guide.comment-stateri-repere-t-il": [
    "Comment Stateri repère-t-il les virements entre mes propres comptes ?",
    "How does Stateri spot transfers between my own accounts?",
  ],
  "guide.il-rapproche-une-sortie-et": [
    "Il rapproche une sortie et une entrée de même montant, sur des comptes différents, à trois jours d'écart au plus, qui ne sont pas déjà liées. Il vous propose les paires, vous confirmez : rien n'est lié sans votre accord.",
    "It matches an outgoing and an incoming transaction of the same amount, on different accounts, at most three days apart, that are not already linked. It suggests the pairs, you confirm: nothing is linked without your approval.",
  ],
  "guide.mes-donnees-quittent-elles-mon": [
    "Mes données quittent-elles mon téléphone pour ces analyses ?",
    "Does my data leave my phone for these analyses?",
  ],
  "guide.non-le-scanner-d-abonnement": [
    "Non. Le scanner d'abonnement et la détection des virements se calculent sur votre appareil : aucune donnée n'est envoyée, ni à un serveur ni à un modèle de langage.",
    "No. The subscription scanner and transfer detection are computed on your device: no data is sent, neither to a server nor to a language model.",
  ],
  "guide.guide-pas-a-pas": [
    "Guide · Pas à pas",
    "Guide · Step by step",
  ],
  "guide.utiliser-stateri-etape-par-etape": [
    "Utiliser Stateri,<br /><em>étape par étape.</em>",
    "Using Stateri,<br /><em>step by step.</em>",
  ],
  "guide.ce-guide-explique-comment-demarrer": [
    "Ce guide explique comment démarrer, saisir vos dépenses, laisser les détecteurs repérer abonnements et virements internes, et sauvegarder vos données dans votre propre Google Drive.",
    "This guide explains how to get started, enter your expenses, let the detectors spot subscriptions and internal transfers, and back up your data to your own Google Drive.",
  ],
  "guide.1-demarrer": [
    "1 · Démarrer",
    "1 · Get started",
  ],
  "guide.2-saisir": [
    "2 · Saisir",
    "2 · Enter data",
  ],
  "guide.3-detecteurs": [
    "3 · Détecteurs",
    "3 · Detectors",
  ],
  "guide.4-sauvegarder": [
    "4 · Sauvegarder",
    "4 · Back up",
  ],
  "guide.etape-1": [
    "Étape 1",
    "Step 1",
  ],
  "guide.ouvrez-app-stateri-fr-dans-2": [
    "Ouvrez <strong>app.stateri.fr</strong> dans Chrome (Android) ou Safari (iPhone). Vous pouvez l'ajouter à l'écran d'accueil : voir <a href=\"installer.html\">Installer</a>.",
    "Open <strong>app.stateri.fr</strong> in Chrome (Android) or Safari (iPhone). You can add it to your home screen: see <a href=\"installer.html\">Install</a>.",
  ],
  "guide.connectez-vous-avec-votre-compte": [
    "Connectez-vous avec votre compte Google. Seule votre adresse e-mail est collectée ; voir la <a href=\"privacy.html\">politique de confidentialité</a>.",
    "Sign in with your Google account. Only your e-mail address is collected; see the <a href=\"privacy.html\">privacy policy</a>.",
  ],
  "guide.ajoutez-vos-comptes-banque-type": [
    "Ajoutez vos comptes (banque, type de compte, devise) avec leur solde de départ.",
    "Add your accounts (bank, account type, currency) with their starting balance.",
  ],
  "guide.plus-de-details-dans-comment": [
    "Plus de détails dans <a href=\"comment-ca-marche.html\">Comment ça marche</a>.",
    "More details in <a href=\"comment-ca-marche.html\">How it works</a>.",
  ],
  "guide.etape-2": [
    "Étape 2",
    "Step 2",
  ],
  "guide.saisir-vos-operations": [
    "Saisir vos opérations",
    "Entering your transactions",
  ],
  "guide.a-la-main-montant-compte": [
    "<strong>À la main</strong> : montant, compte, catégorie, note. Les dépenses fixes se déclarent sur la dépense elle-même.",
    "<strong>By hand</strong>: amount, account, category, note. Fixed expenses are declared on the expense itself.",
  ],
  "guide.a-la-voix-la-dictee": [
    "<strong>À la voix</strong> : la dictée est comprise par un moteur local, sur votre appareil. Un connecteur d'intelligence artificielle externe existe, il est éteint par défaut et ne s'active qu'avec votre propre clé.",
    "<strong>By voice</strong>: dictation is understood by a local engine, on your device. An external artificial-intelligence connector exists; it is off by default and only turns on with your own key.",
  ],
  "guide.par-import-fichier-csv-modele": [
    "<strong>Par import</strong> : fichier CSV (modèle fourni), Crédit Mutuel, Revolut. Voir <a href=\"transactions.html\">Transactions</a>.",
    "<strong>By import</strong>: CSV file (provided template), Crédit Mutuel, Revolut. See <a href=\"transactions.html\">Transactions</a>.",
  ],
  "guide.recurrences-loyer-abonnements-salair": [
    "<strong>Récurrences</strong> : loyer, abonnements, salaire, configurés une fois. Voir <a href=\"recurrences.html\">Dépenses récurrentes</a>.",
    "<strong>Recurring items</strong>: rent, subscriptions, salary, set up once. See <a href=\"recurrences.html\">Recurring expenses</a>.",
  ],
  "guide.etape-3": [
    "Étape 3",
    "Step 3",
  ],
  "guide.les-detecteurs-ce-que-stateri": [
    "Les détecteurs : ce que Stateri repère pour vous",
    "The detectors: what Stateri spots for you",
  ],
  "guide.deux-detecteurs-travaillent-sur-votr": [
    "Deux détecteurs travaillent sur votre historique. <strong>Tous deux tournent sur votre appareil et n'envoient aucune donnée, ni à un serveur ni à un modèle de langage.</strong> Ils proposent, vous décidez.",
    "Two detectors work on your history. <strong>Both run on your device and send no data, neither to a server nor to a language model.</strong> They suggest, you decide.",
  ],
  "guide.le-scanner-d-abonnement": [
    "Le scanner d'abonnement",
    "The subscription scanner",
  ],
  "guide.il-cherche-les-prelevements-de": [
    "Il cherche les prélèvements de <strong>même montant exact</strong>, par compte, qui reviennent à un rythme régulier.",
    "It looks for charges of the <strong>exact same amount</strong>, per account, that come back at a regular rhythm.",
  ],
  "guide.il-repere-une-hausse-de": [
    "Il repère une <strong>hausse de prix</strong> quand un montant voisin prend la suite de l'ancien, et un abonnement qui <strong>s'est arrêté</strong>.",
    "It spots a <strong>price increase</strong> when a nearby amount follows the old one, and a subscription that has <strong>stopped</strong>.",
  ],
  "guide.il-ne-retient-volontairement-que": [
    "Il ne retient volontairement que les montants identiques : un essai sur des données réelles a montré qu'élargir la recherche produisait surtout de fausses détections.",
    "It deliberately keeps only identical amounts: a test on real data showed that widening the search mostly produced false detections.",
  ],
  "guide.les-operations-retenues-sont-montree": [
    "Les opérations retenues sont montrées une à une, pour que vous les vérifiiez avant d'en faire une charge récurrente.",
    "The transactions it picks are shown one by one, so that you can check them before turning them into a recurring item.",
  ],
  "guide.la-detection-des-virements-internes": [
    "La détection des virements internes",
    "Internal transfer detection",
  ],
  "guide.elle-rapproche-une-sortie-et": [
    "Elle rapproche une sortie et une entrée de <strong>même montant</strong>, sur des <strong>comptes différents</strong>, à <strong>trois jours d'écart au plus</strong>.",
    "It matches an outgoing and an incoming transaction of the <strong>same amount</strong>, on <strong>different accounts</strong>, <strong>at most three days apart</strong>.",
  ],
  "guide.elle-ignore-les-operations-deja": [
    "Elle ignore les opérations déjà liées et classe les paires par vraisemblance.",
    "It ignores transactions that are already linked and ranks the pairs by likelihood.",
  ],
  "guide.rien-n-est-lie-sans": [
    "Rien n'est lié sans votre confirmation : un virement interne n'est ainsi plus compté comme une dépense.",
    "Nothing is linked without your confirmation: an internal transfer is then no longer counted as an expense.",
  ],
  "guide.pourquoi-sur-l-appareil-savoir": [
    "Pourquoi sur l'appareil ? Savoir ce qui se répète ne demande que des dates et des montants. Il n'y a donc aucune raison que vos données financières quittent votre téléphone.",
    "Why on the device? Knowing what repeats only takes dates and amounts. There is therefore no reason for your financial data to leave your phone.",
  ],
  "guide.aller-plus-loin": [
    "Aller plus loin",
    "Going further",
  ],
  "guide.analyser-et-anticiper": [
    "Analyser et anticiper",
    "Analyze and anticipate",
  ],
  "guide.statistiques-depenses-par-categorie-": [
    "<a href=\"statistiques.html\">Statistiques</a> : dépenses par catégorie, évolution du solde, comparaison aux années précédentes.",
    "<a href=\"statistiques.html\">Statistics</a>: spending by category, balance over time, comparison with previous years.",
  ],
  "guide.budget-previsionnel-projection-de-fi": [
    "<a href=\"previsionnel.html\">Budget prévisionnel</a> : projection de fin de mois, lignes certaines ou probables.",
    "<a href=\"previsionnel.html\">Forecast budget</a>: end-of-month projection, certain or probable lines.",
  ],
  "guide.patrimoine-fortune-nette-repartition": [
    "<a href=\"patrimoine.html\">Patrimoine</a> : fortune nette, répartition par banque et type de compte, investissements.",
    "<a href=\"patrimoine.html\">Net worth</a>: net worth, breakdown by bank and account type, investments.",
  ],
  "guide.multi-devises-un-compte-par": [
    "<a href=\"devises.html\">Multi-devises</a> : un compte par devise, conversion dans les graphiques.",
    "<a href=\"devises.html\">Multi-currency</a>: one currency per account, conversion in the charts.",
  ],
  "guide.comptes-partages-taux-de-contributio": [
    "<a href=\"partage.html\">Comptes partagés</a> : taux de contribution et vue « Ma part ».",
    "<a href=\"partage.html\">Shared accounts</a>: contribution rates and the \"My share\" view.",
  ],
  "guide.etape-4": [
    "Étape 4",
    "Step 4",
  ],
  "guide.sauvegarder-et-restaurer": [
    "Sauvegarder et restaurer",
    "Back up and restore",
  ],
  "guide.la-sauvegarde-est-facultative-et": [
    "La sauvegarde est <strong>facultative</strong> et va dans <strong>votre propre Google Drive</strong>, avec la permission limitée « drive.file » : Stateri ne voit que les fichiers qu'il a créés.",
    "Backup is <strong>optional</strong> and goes to <strong>your own Google Drive</strong>, with the limited \"drive.file\" permission: Stateri only sees the files it created.",
  ],
  "guide.les-fichiers-s-appellent-stateri": [
    "Les fichiers s'appellent <code>stateri-AAAA-MM-JJ-HH-MM.json</code>. Les plus anciens sont purgés automatiquement.",
    "The files are named <code>stateri-YYYY-MM-DD-HH-MM.json</code>. The oldest are purged automatically.",
  ],
  "guide.pour-restaurer-choisissez-une-sauveg": [
    "Pour restaurer, choisissez une sauvegarde dans l'application. Pour partir, supprimez ces fichiers et révoquez l'accès depuis votre compte Google : il n'y a rien à supprimer chez Stateri.",
    "To restore, choose a backup in the app. To leave, delete these files and revoke access from your Google account: there is nothing to delete at Stateri.",
  ],
  "guide.sur-ce-guide": [
    "Sur ce guide",
    "On this guide",
  ],
  "guide.plus-de-reponses-dans-la": [
    "Plus de réponses dans la <a href=\"faq.html\">FAQ complète</a>. Les dernières évolutions sont dans <a href=\"quoi-de-neuf.html\">Quoi de neuf</a>.",
    "More answers in the <a href=\"faq.html\">full FAQ</a>. The latest changes are in <a href=\"quoi-de-neuf.html\">What's new</a>.",
  ],
};
