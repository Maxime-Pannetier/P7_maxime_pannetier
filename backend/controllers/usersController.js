const database = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');



// CREATION USER / SIGNUP
exports.signup = (req, res, next) => {

  // Contraintes du mdp a créer
  var schema = new passwordValidator();
  schema
    .is().min(8)                                    // Minimum 8 caractères
    .is().max(100)                                  // Maximum 100 caractères
    .has().uppercase()                              // Doit avoir une majuscule
    .has().lowercase()                              // Doit avoir une minuscule
    .has().digits(2)                                // Minimum 2 chiffres
    .has().not().spaces()                           // Pas d'espace
    .is().not().oneOf(['Passw0rd', 'Password123']); // mdp interdits

  // Validation des contraintes mdp
  if (!schema.validate(req.body.password)) {
    res.status(400).json({ message: "le mot de passe n'est pas assez complexe !" });
    return;
  }

  // hash du mdp
  bcrypt.hash(req.body.password, 10)
    // Puis Création du user
    .then(hash => {
      // user est par défault non-admin (admin = 0)
      database.execute("INSERT INTO users (email, password, isAdmin, prenom, nom) VALUES (?, ?, ?, ?, ?)", [req.body.email, hash, 0, req.body.prenom, req.body.nom])
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => {
          console.log(error);
          // vérification email utilisé (email unique dans BDD)
          if (error.code == "ER_DUP_ENTRY") {
            res.status(400).json({ error: "Un compte existe déjà" });
          }
          else
            res.status(400).json({ error: "Merci de réessayer plus tard" });
        });
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

// CONNEXION / LOGIN
exports.login = (req, res, next) => {
  // recherche email existe dans BDD
  database.execute("SELECT `email`,`password`,`isAdmin`, `id`, `prenom` FROM users WHERE `email`=?;", [req.body.email])
    .then(([rows, fields]) => {
      
      // email n'existe pas
      if (rows.length == 0) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      // email existe
      let user = rows[0];
      // comparaison mdp avec son hash associé
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          // si mdp incorrect
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          // si mdp correct
          res.status(200).json({
            userId: user.id,
            isAdmin: user.isAdmin,
            // token valide 24h
            token: jwt.sign(
              { userId: user.id,
                isAdmin: user.isAdmin },

              process.env.JWT_SECRET,
              { expiresIn: '24h' }
            ),
            userPrenom: user.prenom,
          });
        })
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
};

// SUPPRIMER USER
exports.deleteUser = (req, res, next) => {
  // Selection user depuis son ID
  database.execute("SELECT * FROM users WHERE id=?", [req.params.id])
    .then(([rows, fields]) => {
      // Vérification userID = current User et/ou User = admin
      if (req.currentUser.isAdmin === 1 || (rows.length > 0 && rows[0].id === req.currentUser.userId)) {
        database.execute("DELETE FROM users WHERE id=?", [req.params.id])
          .then(() => res.status(201).json({ message: 'user supprimé !' }))
          .catch(error => res.status(500).json({ error: error.message }));
      }
      // userID different et non admin
      else {
        res.status(401).json({ error: "vous ne pouvez pas supprimer ce profil" });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
};