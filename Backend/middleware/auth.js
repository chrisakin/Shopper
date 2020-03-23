

/* because many things can go wrong, we are putting everything inside a  try...catch  block

we extract the token from the incoming request's  
Authorization  header — remember that it will also contain the 
 Bearer  keyword, so we use the split function to get everything after the space in the header — 
 and any errors thrown here will wind up in the  catch  block

we then use the  verify  function to decode our token — 
if the token is not valid, this will throw an error

we extract the user ID from our token

if the request contains a user ID, we compare it to the one extracted
 from the token — if they are not the same, we throw an error

otherwise, all is well, and our user is authenticated — 
we pass execution along using the  next()  function */

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};