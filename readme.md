
## INSTALLATION
### Prérequis :

<ul>
  <li> Git</li>
  <li> Node.js</li>
  <li> MySql</li>
</ul>

Créer un dossier vide puis cloner ce repository à l'intérieur : 

```
git clone https://github.com/Maxime-Pannetier/P7_maxime_pannetier.git
```
## MySQL
### Creer et importer BDD
<ol>
  <li>Creer Base de données et l'utiliser</li>
  <li>Importer les éléments du fichier "BDD_Groupomania.zip" dans la base de donnée créée</li>  
</ol>
 
### Configurer .env
<ol>
  <li>dupliquer template.env</li>
  <li>renommer la copie en .env</li>
  <li>éditer et remplir les variables avec votre configuration local</li>
</ol>

## BACK END
Ouvrir un terminal dans le dossier backend puis effectuer ces lignes de commandes :
```
npm install
npm run start
```
## FRONT END
Ouvrir un autre terminal dans le dossier frontend puis effectuer les lignes de commandes suivantes :
```
npm install
npm run serve
```
## LANCEMENT
Ouvrir le navigateur a l'adresse http://localhost:8080/
