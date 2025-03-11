# 🎮 Gamerz - API REST

API sécurisée pour la plateforme de discussion en temps réel dédiée aux joueurs.

---

## 🚀 Installation et Démarrage

### 📌 Prérequis

- **Node.js** `v22`
- **MongoDB** installé et en cours d'exécution

### 📥 Cloner le projet

```sh
git clone https://github.com/2024-devops-alt-dist/Gamerz-GG-ED.git
cd Gamerz-GG-ED
```

### Installer Les Dependances

```sh
npm install 
```

### 📦 Installer les dépendances

```sh
npm install
```
### ⚙️ Configuration

L'API nécessite un fichier **.env** pour stocker les configurations sensibles.  
Crée un fichier **.env** à la racine du projet avec le contenu suivant :

```ini
MONGO_URI=mongodb://127.0.0.1:27017/gamerz
PORT=5050
JWT_SECRET=testJwt
```

- **MONGO_URI** : URL de connexion à la base de données MongoDB.
- **PORT** : Port sur lequel l'API sera lancée.
- **JWT_SECRET** : Clé secrète utilisée pour signer et vérifier les tokens JWT.


▶️ Lancer l'API

```sh
npm start
```

L'API sera accessible sur http://localhost:5050.


# 📌 Routes de l'API

## 🚀 Authentification & Utilisateur

| Méthode  | Route                    | Description                                   |
|----------|--------------------------|-----------------------------------------------|
| **POST**  | `/api/register`           | Inscription d'un utilisateur                  |
| **POST**  | `/api/login`              | Connexion d'un utilisateur                    |
| **POST**  | `/api/logout`             | Déconnexion de l'utilisateur                  |
| **GET**   | `/api/me`                 | Récupérer les infos de l'utilisateur connecté |
| **PUT**   | `/api/update-profile`     | Mettre à jour le profil de l'utilisateur      |
| **PUT**   | `/api/change-password`    | Changer le mot de passe de l'utilisateur      |
| **POST**  | `/api/refresh-token`      | Rafraîchir le token JWT                       |

## 🛠️ Admin

| Méthode   | Route                      | Description                           |
|-----------|----------------------------|---------------------------------------|
| **PUT**   | `/api/admin/validate/:id`  | Valider un utilisateur               |
| **PUT**   | `/api/admin/ban/:id`       | Bannir un utilisateur                |
| **DELETE**| `/api/admin/delete/:id`    | Supprimer un utilisateur             |
| **GET**   | `/api/admin/users`         | Récupérer la liste des utilisateurs  |
