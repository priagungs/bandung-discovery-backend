const jwt = require('jsonwebtoken');
const config = require('../config');

const authCheck = async (req, res, next) => {
  console.log(req.path);
  
  if ( req.path.includes('/auth') ) return next();
  if (req.headers['authorization']) {
    try {
      let token = req.headers['authorization'].split(' ')[1];
      let decoded = await jwt.verify(token, config.secret);
      console.log(token);
      console.log(decoded);
      res.locals.id_user = decoded.id;
      next();
    } catch (error) {
      res.send(401);
    }
    
  } else {
    res.send(401);
  }
}

module.exports = {authCheck};