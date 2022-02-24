const jwt = require('jsonwebtoken');
const dbconfig = require("../config/db");

// module.exports = (req, res, next) => {
//     try {
//       if (req.jwt) {
//         const { jwt: token } = req.cookies;
//         const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
//         const { user_id: userId } = decodedToken;
//         let db = dbc.getDB();
//         const sql = `SELECT user_id FROM users WHERE user_id = ${userId}`;
//         db.query(sql, (err, result) => {
//           if (err) res.status(204).json(err);
//           else {
//             next();
//           }
//         });
//       } 
//     } catch (err) {
//       console.log(err);
//       res.status(401).json({ message: "Unauthorized" });
//     }
//   };




module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.currentUser = decodedToken;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error:'Invalid request!'
    });
  }
};