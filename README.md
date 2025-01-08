# 📚 Habit Tracker App

Une application de suivi d'habitudes construite avec **Node.js**, **Express.js**, **Angular**, et **MongoDB**. L'application permet aux utilisateurs de gérer leurs habitudes quotidiennes avec des notifications automatisées par e-mail.

---

## 🚀 **1. Installation du Backend**

### 📁 **Cloner le projet**
```bash
git clone https://github.com/ghostondancefloor/Projet_FullStack.git
cd ../backend
```

### ⚙️ **Configurer les variables d'environnement**
Créer un fichier `.env` à la racine du dossier backend et ajouter :
```env
DB_USER=your_db_user
DB_HOST=your_db_host
DB_PASSWORD=your_db_password
DB_NAME=test2
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_email@example.com
```

### 📦 **Installer les dépendances**
```bash
npm install
```

### 🛠️ **Lancer le serveur backend**
```bash
npm start
```

---

## 🌐 **2. Installation du Frontend**

### 📁 **Aller dans le dossier frontend**
```bash
cd ../frontend
```

### 📦 **Installer les dépendances**
```bash
npm install
```

### 🖥️ **Lancer le serveur frontend**
```bash
ng serve
```

---

## 📧 **4. Notifications par e-mail**
- Les e-mails de rappel sont envoyés automatiquement grâce à **SendGrid**.
- Les rappels sont planifiés toutes les 45 minutes grâce à **node-cron**.

---

## ✅ **5. Commandes Utiles**

### Backend :
- **Démarrer le serveur :** `npm start`

### Frontend :
- **Démarrer le serveur :** `ng serve`

---

*Merci d'utiliser Habit Tracker App et bon suivi d'habitudes ! 🎯*

