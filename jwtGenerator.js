const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id, usr_email, usr_type) {


  const payload = {
    user: {
      usr_id: user_id,
      usr_email: usr_email,
      usr_type: usr_type
    }
  };
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;