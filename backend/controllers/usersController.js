const database = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passwordValidator = require('password-validator');



//SIGNUP
exports.signup = (req, res, next) => {

    var schema = new passwordValidator();
    // Add properties to it
    schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
    
    // Validate against a password string
    if(!schema.validate(req.body.password))
    {
      res.status(400).json({message: "le mot de passe n'est pas assez complexe !"});
      return;
    }
    
    
    
      bcrypt.hash(req.body.password, 10) // hash mdp
        .then(hash => { 
            database.execute("INSERT INTO users (userName, password, isAdmin) VALUES (?, ?, ?)", [req.body.email,hash,0])
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => {
                    console.log(error);
                    if(error.code=="ER_DUP_ENTRY")
                    {
                    res.status(400).json({ error:"Un compte existe déjà" });
                    }
                    else
                    res.status(400).json({ error:"Merci de réessayer plus tard" });
                });
        })
        .catch(error => res.status(500).json({ error:error.message }));
    };
    
    
    
    
    
//     // login = connection compte utilisateur avec mdp
//      exports.login = (req, res, next) => {
//       Users.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         bcrypt.compare(req.body.password, user.password) // compare mdp clair + hashé
//           .then(valid => {
//             if (!valid) {
//               return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                 { userId: user._id },
//                 process.env.JWT_SECRET,
//                 { expiresIn: '24h' }
//               )
//             });
//           })
//           .catch(error => res.status(500).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
      // };