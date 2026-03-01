# Portfolio - Julien Clavier

ce repo contient mon portfolio développé avec Next.js.

## Nom / Prénom
Julien Clavier

## URL du site déployé
À compléter après déploiement sur Render

## Lancer le projet en local

### Prérequis
- Node.js (18 ou +)
- npm
- MySQL (WAMP + phpMyAdmin fonctionne très bien)

### 1) Récupérer le projet
```bash
git clone <url-du-repo>
cd Portfolio/julienclavier
```

### 2) Installer les dépendances
```bash
npm install
```

### 3) Préparer la base de données
1. Créer une base nommée `portfolio`
2. Importer le fichier `database.sql` dans cette base

### 4) Ajouter le fichier `.env`
À la racine du projet, créer un fichier `.env` avec :

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=portfolio
DATABASE_URL=mysql://root:@localhost:3306/portfolio
INIT_DB_TOKEN=initial-setup
RESEND_API_KEY=votre_cle_resend
CONTACT_RECEIVER_EMAIL=votre_email
```

### 5) Démarrer le serveur
```bash
npm run dev
```

Le site est ensuite accessible sur :
http://localhost:3000
