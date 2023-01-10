# bouges-toi ! :rocket:


## COMMANDES :fire:

### Déploiement du schéma de BDD : 
npm run deploy

###  Démarrage front :
npm run dev

###  Démarrage back : 
npm run start


## INFOS

### Mail
bougestoi.contact@gmail.com

### STMP 
Postmark

### TWITTER
-

### DRIBBLE
-

### REDDIT
-

### FRAMEWORK CSS
- Ant Design
- https://ant.design/

### GOOGLE (gmail/auth/youtube)
Maps JavaScript API
bougestoi.contact@gmail.com

### KICKSTARTER
-

### OVH 
-

### HEROKU
-

## DOCUMENTATION :page_facing_up: 

###  Inscrire une deuxième clé SSH sur son PC : 
-

###  APOLLO : Client Front
-

### MAILTRAP : Safe Email Testing 
-

###   GRAPHQL : Système de requêtage 
-

###   PRISMA : ORM GraphQL + BDD
-

###  YOGA SERVER : Serveur Express / GraphQL
-

###  NEXT.JS : FrontEnd (SSR)
-

###  HEROKU (Déploiement, hypothèse 1)


###  STRIPE : Système de paiement
-

### CRYPTO
-

### STYLED 
-
## DEPLOIEMENT
-

### Prisma Server
 - MySQL

 - Schéma en DEV : Prisma Admin: https://eu1.prisma.sh/thibault-jeanpierre/bouges-toi/dev/_admin
 - Service : bouges-toi  |   Stage : dev
 - Hobby Dev: 10 000 lignes
 - Hobby Basic: 10 millions de lignes (9$)
 - Standard: 4go de stockage (50$)
 - Pour déployer : npm run deploy -- -n

### Yoga Server
 - Mutation and Query Resolvers

 1./ POUR DEPLOYER SUR HEROKU 

 - Installation du CLI de Heroku : https://cli-assets.heroku.com/heroku-x64.exe
 - heroku login
 - Créer le serveur : heroku apps:create bougestoi-yoga-prod
 - Taper git remove -v pour voir les deux remotes "heroku"
 - Il faut créer des sub-remotes pour le front et le back
 - Pour le back : git remote add heroku-backend https://git.heroku.com/bougestoi-yoga-prod.git
 - Push le subremote : git subtree push --prefix backend heroku-backend master
 - debug : heroku logs --tail --app bougestoi-yoga-prod
 - Aller sur le serveur Heroku => Settings => Config vars et copier les variables d'environnement

 2./ POUR DEPLOYER SUR NOW : 

 npm install -g now
 cd backend
 now


### React App
 - Next.js

  1./ HEROKU :

 - Ajouter une URL prodEndpoint dans le HOC "withData.js" et ajouter le yoga server de prod dans le fichier config.js
 - git remote -v pour voir les remotes
 - heroku apps:create bougestoi-next-prod (nouveau git repo)
 - git remote add heroku-frontend https://git.heroku.com/bougestoi-next-prod.git
 - git remote -v
 - git add et commit
 - Ajouter la commande next build et le $PORT sur la commande npm run start
 - git subtree push --prefix frontend heroku-frontend master

 2./ NOW : 
 - cd frontend
 - now
 - Sur Heroku, modifier la variable d'env du frontend (FRONTEND_URL) pour qu'elle match avec celle de now
