const userService = require('../services/userService');

// app.post("/users/signup", async (req, res) => {
//   const { name, email, passWord } = req.body;

//   await database.query(
//     `INSERT INTO users(
//             name,
//             email,
//             password
//         ) VALUES (?, ?, ?);
//         `,
//     [name, email, passWord]
//   );
//   res.status(201).json({ message: "userCreated" });
// });

const signUp = async (req, res) => {
    try {
      const { name, email, password, profileImage } = req.body;
  
      if ( !name || !email || !password ) {
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
  
  module.exports = {
      signUp
  }