# 📚 BIBLIO-WEB-UATM - Système de Gestion de Bibliothèque de Mémoires

## 🎯 Description du Projet

**BIBLIO-WEB-UATM** est une plateforme web moderne développée pour améliorer la flexibilité, la scalabilité, la connectivité et la sécurité du système informatique de l'Université UATM. Le projet comprend :

- **Moteur de recherche de mémoires** par mots-clés
- **Interface d'administration** complète pour la gestion des mémoires
- **Système d'authentification** sécurisé pour les administrateurs
- **Base de données Oracle** pour le stockage des données
- **Interface utilisateur moderne** et responsive

## ✨ Fonctionnalités Principales

### 🔍 Recherche Publique
- **Recherche en temps réel** dans la page d'accueil
- **Recherche avancée** avec filtres par filière
- **Recherche par mots-clés** dans le titre, auteur, résumé et mots-clés
- **Interface intuitive** avec suggestions populaires
- **Résultats dynamiques** affichés en temps réel

### 👨‍💼 Administration
- **Tableau de bord** avec statistiques et actions rapides
- **Gestion complète des mémoires** (CRUD)
- **Interface d'ajout** de nouveaux mémoires
- **Modification** des mémoires existants
- **Suppression sécurisée** avec confirmation
- **Visualisation détaillée** de chaque mémoire

### 🔐 Sécurité
- **Authentification admin** sécurisée
- **Middleware de protection** des routes sensibles
- **Validation des données** avec Vine.js
- **Protection CSRF** sur tous les formulaires

## 🛠️ Technologies Utilisées

### Backend
- **AdonisJS 6** - Framework Node.js moderne
- **Oracle XE** - Base de données relationnelle
- **Lucid ORM** - Gestionnaire de base de données
- **Vine.js** - Validation des données
- **TypeScript** - Typage statique

### Frontend
- **Tailwind CSS** - Framework CSS utilitaire
- **Alpine.js** - Framework JavaScript léger
- **FontAwesome** - Icônes
- **Responsive Design** - Compatible mobile et desktop

### Infrastructure
- **Docker** - Conteneurisation Oracle XE
- **Knex.js** - Query builder pour Oracle
- **Luxon** - Gestion des dates

## 📋 Prérequis

- **Node.js** 18+ 
- **npm** ou **yarn**
- **Docker** et **Docker Compose**
- **Oracle XE** (via Docker recommandé)

## 🚀 Installation et Configuration

### 1. Cloner le Projet
```bash
git clone <repository-url>
cd gasa-uatm
```

### 2. Installer les Dépendances
```bash
npm install
```

### 3. Configuration de l'Environnement
```bash
cp .env.example .env
```

Modifier le fichier `.env` avec vos paramètres :
```env
# Base de données Oracle
DB_CONNECTION=oracle
DB_HOST=localhost
DB_PORT=1521
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=XE

# Configuration de l'application
PORT=3333
APP_KEY=your_app_key
SESSION_DRIVER=cookie
```

### 4. Démarrer Oracle XE avec Docker
```bash
# Créer un conteneur Oracle XE
docker run -d --name oracle-xe \
  -p 1521:1521 \
  -e ORACLE_PWD=your_password \
  -e ORACLE_CHARACTERSET=AL32UTF8 \
  oracleinanutshell/oracle-xe-11g

# Ou utiliser Docker Compose
docker-compose up -d
```

### 5. Exécuter les Migrations
```bash
# Créer les tables
npm run migrate

# Ou tout en une fois (reset + migrate + seed)
npm run migrate-seed
```

### 6. Lancer l'Application
```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm run start
```

## 🗄️ Structure de la Base de Données

### Table `users`
- `id` - Identifiant unique
- `full_name` - Nom complet de l'utilisateur
- `email` - Adresse email (unique)
- `password` - Mot de passe hashé
- `is_admin` - Statut administrateur
- `created_at` - Date de création
- `updated_at` - Date de modification

### Table `memories`
- `id` - Identifiant unique
- `title` - Titre du mémoire
- `authors` - Auteurs du mémoire
- `year` - Année de publication
- `filiere` - Filière d'étude
- `keywords` - Mots-clés (séparés par des virgules)
- `abstract` - Résumé du mémoire
- `file_path` - Chemin vers le fichier PDF
- `created_at` - Date de création
- `updated_at` - Date de modification

## 🔧 Commandes Utiles

### Base de Données
```bash
# Migrations
npm run migrate          # Exécuter les migrations
npm run migrate:reset   # Réinitialiser la base
npm run migrate:rollback # Annuler la dernière migration

# Seeders
npm run db:seed         # Exécuter tous les seeders
npm run db:seed --files="database/seeders/memory_seeder.ts"
```

### Développement
```bash
npm run dev             # Mode développement avec hot reload
npm run build           # Build de production
npm run start           # Démarrer en production
npm run test            # Exécuter les tests
```

## 📱 Utilisation

### Accès Public
1. **Page d'accueil** (`/`) - Recherche rapide et présentation
2. **Recherche avancée** (`/search`) - Interface de recherche complète
3. **Résultats de recherche** - Affichage des mémoires trouvés

### Accès Administrateur
1. **Connexion** (`/login`) - Authentification admin
2. **Dashboard** (`/admin`) - Vue d'ensemble et actions rapides
3. **Gestion des mémoires** (`/admin/memoires`) - CRUD complet

### Compte Administrateur par Défaut
- **Email** : `admin@uatm-gasa.com`
- **Mot de passe** : `admin123`

## 🎨 Charte Graphique

### Couleurs Principales
- **Primary** : `#7f181b` (Rouge brique UATM)
- **Accent** : `#0EA5E9` (Bleu)
- **Success** : `#22C55E` (Vert)
- **Warning** : `#F59E0B` (Orange)
- **Error** : `#EF4444` (Rouge)

### Typographie
- **Police principale** : Nunito (Google Fonts)
- **Tailles** : Responsive avec Tailwind CSS
- **Hiérarchie** : H1-H6 avec échelles cohérentes

## 🔍 Fonctionnalités de Recherche

### Recherche Simple
- Recherche par **mots-clés** dans tous les champs
- **Filtrage par filière** (Informatique, Gestion, Sciences, etc.)
- **Recherche en temps réel** avec délai de 300ms

### Recherche Avancée
- **Combinaison de critères** (titre + filière)
- **Recherche insensible à la casse**
- **Pagination** des résultats (50 par page)
- **Tri par pertinence** et date

## 🛡️ Sécurité

### Authentification
- **Session sécurisée** avec cookies
- **Hashage des mots de passe** avec scrypt
- **Protection CSRF** sur tous les formulaires
- **Middleware d'authentification** sur les routes admin

### Validation
- **Validation côté serveur** avec Vine.js
- **Sanitisation des entrées** utilisateur
- **Protection contre l'injection SQL** via Knex.js
- **Validation des types** avec TypeScript

## 📁 Structure du Projet

```
gasa-uatm/
├── app/
│   ├── controllers/          # Contrôleurs de l'application
│   ├── models/              # Modèles de données
│   ├── validators/          # Validateurs Vine.js
│   └── middleware/          # Middleware personnalisé
├── database/
│   ├── migrations/          # Migrations de base de données
│   └── seeders/             # Données de test
├── resources/
│   ├── views/               # Templates Edge.js
│   ├── css/                 # Styles CSS
│   └── js/                  # JavaScript client
├── start/                   # Configuration de démarrage
├── config/                  # Configuration de l'application
└── tests/                   # Tests automatisés
```

## 🚀 Déploiement

### Environnement de Production
1. **Build de l'application**
   ```bash
   npm run build
   ```

2. **Variables d'environnement**
   - Configurer la base de données Oracle
   - Définir `NODE_ENV=production`
   - Configurer les clés de sécurité

3. **Process Manager**
   ```bash
   npm install -g pm2
   pm2 start ecosystem.config.js
   ```

### Docker (Recommandé)
```bash
# Build de l'image
docker build -t biblio-web-uatm .

# Exécution
docker run -p 3333:3333 biblio-web-uatm
```

## 🧪 Tests

### Exécution des Tests
```bash
# Tous les tests
npm run test

# Tests avec coverage
npm run test:coverage

# Tests en mode watch
npm run test:watch
```

## 📊 Monitoring et Logs

### Logs
- **Logs d'application** dans `storage/logs/`
- **Logs de base de données** via Oracle
- **Logs d'erreur** avec stack traces

### Métriques
- **Performance** des requêtes de recherche
- **Utilisation** de la base de données
- **Statistiques** d'utilisation

## 🤝 Contribution

### Guidelines
1. **Fork** le projet
2. **Créer** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** les changements (`git commit -m 'Add AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrir** une Pull Request

### Standards de Code
- **TypeScript** strict
- **ESLint** pour la qualité du code
- **Prettier** pour le formatage
- **Tests unitaires** pour les nouvelles fonctionnalités

## 📝 Changelog

### Version 1.0.0
- ✅ Système de recherche de mémoires
- ✅ Interface d'administration complète
- ✅ Authentification sécurisée
- ✅ Base de données Oracle
- ✅ Interface responsive moderne

## 📞 Support

### Contact
- **Email** : info@uatm-gasa.com
- **Téléphone** : (229) 01 65 78 77 21
- **Adresse** : 2ème rue à gauche après le CEG Gbégamey

### Documentation
- **API Documentation** : `/docs` (à implémenter)
- **Guide utilisateur** : Disponible dans l'interface admin
- **Wiki** : Documentation technique détaillée

## 📄 Licence

Ce projet est développé pour l'Université UATM et est propriétaire.

---

**Développé avec ❤️ pour l'Université UATM**

*Dernière mise à jour : {{ new Date().toLocaleDateString('fr-FR') }}*
