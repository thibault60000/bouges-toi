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
bougestoi.contact@gmail.com

### FACEBOOK
 - AUTH : bougestoi
 - Contact mail : thibault60000@gmail.com
 - ID de l’app : 2497386717161081
 - AppSecret : b3d0fbf44f3968efdd83abb3593830c3

### DRIBBLE
-

### REDDIT
-

### GOOGLE (gmail/auth/youtube)
bougestoi.contact@gmail.com
- Mail Client : thibault60000@gmail.com 
- ID Client : 490758671748-e7t4bs8rbisrr6kk2crfdurqsfjtees8.apps.googleusercontent.com
- Secret 7XjMhs4TqkRIIKH8okz02dYu

### KICKSTARTER

### OVH 
thibault jeanpierre  (jt65186-ovh)

### HEROKU 
https://dashboard.heroku.com/apps


## DOCUMENTATION :page_facing_up: 

###  Inscrire une deuxième clé SSH sur son PC : 
https://medium.com/@thibault60000/cr%C3%A9er-cl%C3%A9-ssh-2-comptes-git-sur-windows-19702d1f62d7

###  APOLLO : Client Front
https://www.apollographql.com/docs/react/

### MAILTRAP : Safe Email Testing 
https://mailtrap.io/

###   GRAPHQL : Système de requêtage 
https://graphql.org/learn/

###   PRISMA : ORM GraphQL + BDD
https://www.prisma.io/

###  YOGA SERVER : Serveur Express / GraphQL
https://github.com/prisma/graphql-yoga

###  NEXT.JS : FrontEnd (SSR)
https://nextjs.org/

###  HEROKU (Déploiement, hypothèse 1)
https://www.heroku.com/

###  STRIPE : Système de paiement
https://stripe.com/en-fr
Fausse CB : 4242 4242 4242 4242   02/22 222

### CRYPTO
Le module de cryptage fournit des fonctionnalités cryptographiques comprenant un ensemble de wrappers pour les fonctions de hachage, HMAC, chiffrement, déchiffrement, signature et vérification d'OpenSSL.

### PROMISIFY
Convertit une fonction callback en une fonction basée sur une Promise.

## DEPLOIEMENT

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
