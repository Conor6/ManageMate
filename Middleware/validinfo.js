module.exports = (req, res, next) => {
    const { usr_email, usr_password, usr_type } = req.body;

    console.log("validInfo");
  
    function validEmail(userEmail) {

      //console.log("valid Email");
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
      
    }
  
    if (req.path === "/signup") {

      

      if (![usr_email, usr_password, usr_type].every(Boolean)) {

        return res.status(401).json("Missing Credentials");

      } 
      else if (!validEmail(usr_email)) {

        return res.status(401).json("Invalid Email");

      }
    } 
    else if (req.path === "/login") {

      

      if (![usr_email, usr_password].every(Boolean)) {

        return res.status(401).json("Missing Credentials");

      } 
      else if (!validEmail(usr_email)) {

        return res.status(401).json("Invalid Email");

      }
    }
  
    next();
  };