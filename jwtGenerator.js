const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(usr_id, usr_email, usr_type) {
  
  const payload = {
    user: {
      usr_id: usr_id,
      usr_email: usr_email,
      usr_type:usr_type
    }

  };

  //console.log("Values inside Generator");
  //console.log(usr_id);
  //console.log(usr_email);
  //console.log(usr_type);
  
  

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;