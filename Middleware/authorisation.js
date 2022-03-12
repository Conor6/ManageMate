const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req, res, next) =>{
    try {
        
        console.log("Inside authorisation");
        const jwtToken = req.header("token");

        //console.log(jwtToken);

        if(!jwtToken){

            console.log("inside !jwtToken")

            return res.status(403).json("Not Authorised");
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;
        next();

    } 
    catch (error) 
    {

        console.error(error.message);
        return res.status(403).json("Not Authorised");
        
    }
}