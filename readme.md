prerequis : nodeJS, MySQL


1) cloner repository
2) installer base de données -> extraire BDD_Groupomania.zip -> importer les fichiers dans la base de données de votre choix (via phpmyadmin ou mysql workbench)
3) configurer .env
  -> dupliquer template.env
  -> le renommer la copie en .env
  -> éditer et remplir les variables avec votre configuration local
4) back -> cd backend -> npm install -> npm run start
5) front -> cd frontend -> cd groupomania -> npm install -> npm run serve
6) ouvrir localhost:8080

