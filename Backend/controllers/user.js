/* we call bcrypt's hash function on our password, and ask it to salt the 
password 10 times (the higher the value here, the longer the function will take,
     but the more secure the hash — for more information, check out bcrypt's documentation)

this is an asynchronous 
function which returns a promise, where we receive the produced hash

in our  then  block, we create a new user and save it to 
the database, returning a success response if successful, and any errors with an error code if not */


const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const User = require('../models/user');
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
          const user = new User({
            email: req.body.email,
            password: hash
          });
          user.save().then(
            () => {
              res.status(201).json({
                message: 'User added successfully!'
              });
            }
          ).catch(
            (error) => {
              res.status(500).json({
                error: error
              });
            }
          );
        }
      );
};


/*we use our Mongoose model to check if the email entered by the user corresponds
 to an existing user in the database

if it does not, we return a  401 Unauthorized  error

if it does, we move on

we use bcrypt's compare function to compare the user entered password 
with the hash saved in the database

if they do not match, we return a  401 Unauthorized  error

if they match, our user has valid credentials

if our user has valid credentials, we return a  200  response
 containing the user ID and a token, which for now is a generic string */

 exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
      (user) => {
        if (!user) {
          return res.status(401).json({
            error: new Error('User not found!')
          });
        }
        bcrypt.compare(req.body.password, user.password).then(
          (valid) => {
            if (!valid) {
              return res.status(401).json({
                error: new Error('Incorrect password!')
              });
            }
/* we use jsonwebtoken's  sign  function to encode a new token

that token contains the user's ID as a payload

we use a temporary development secret string to 
encode our token (to be replaced with a much longer, random string for production)

we set the token's validity time to 24 hours

we send the token back to the front end with our response */
            const token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' });
            res.status(200).json({
              userId: user._id,
              token: token
            });
          }
        ).catch(
          (error) => {
            res.status(500).json({
              error: error
            });
          }
        );
      }
    ).catch(
      (error) => {
        res.status(500).json({
          error: error
        });
      }
    );
  };