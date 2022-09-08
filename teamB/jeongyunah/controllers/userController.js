const userService = require('../services/userService');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, password, profileImage );
    return res.status(201).json({
      message: 'userCreated',
    });

  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};


const signIn = async (req, res) => {
  try{
    const {email, password} = req.body;

    if(!email || !password){
      return res.status(400).json({message : 'KEY_ERROR'});

    }
    await userService.signIn(email, password);
    return res.status(201).json({
      message: 'userCreated',
    });
  }
  catch (err) {

  }
}


module.exports = {
	signUp,
  signIn
}