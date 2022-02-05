const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

app.use(cors());
app.use(express.json());

const saltRounds = 10;


app.post('/addcourt', async(req, res) => {
  try {

    const { crt_name } = req.body;
    const { crt_desc } = req.body;

    const insert = await pool.query(
      "INSERT INTO court (crt_name, crt_desc) VALUES($1, $2)", 
      [crt_name, crt_desc]
    );

    res.json(insert);

  } 
  catch (error) {
    console.log(error.message);
  }

})

app.post('/login', async(req, res) => {
  try {

    const email = req.body.usr_email;
    const  password = req.body.usr_password;

    console.log(email);
    console.log(password);
    
    const user = await pool.query("SELECT usr_password FROM user_table WHERE usr_email = $1", [email]);

    //console.log(user);

    console.log("Test 2");

    console.log(user.rows.length);

    if(user.rows.length === 0){

      console.log("Test 3");

      return res.status(401).json("Email or Password incorrect")

    }


    let db_password = user.rows[0].usr_password;

    console.log("Password from Database: ");
    console.log(db_password);

    /*if(password == db_password){
      console.log("Correct Password");
    }
    */

    console.log("Test 4");

    const validPassword = await bcrypt.compare(password, db_password);

    console.log("Valid Password: ");
    console.log(validPassword);

    if(!validPassword){

      console.log("Test 5");

      return res.status(401).json("Email or Password incorrect!");

    }
    

    res.json(user);

  } 
  catch (error) {

    console.log(error.message);

    res.status(500).send("Server Error");

  }

})


app.post('/addgym', async(req, res) => {
  try {

    const { crt_name } = req.body;
    const { crt_desc } = req.body;

    const insert = await pool.query(
      "INSERT INTO court (crt_name, crt_desc) VALUES($1, $2)", 
      [crt_name, crt_desc]
    );

    res.json(insert);

  } 
  catch (error) {
    console.log(error.message);
  }

})

app.post('/signup', async(req, res) => {
  try {

    const { usr_email } = req.body;
    const { usr_password } = req.body;


    bcrypt.genSalt(saltRounds,  function(err, salt) {
      bcrypt.hash(usr_password, salt, async function(err, hash) {

        const insert = await pool.query(
          "INSERT INTO user_table (usr_email, usr_password) VALUES($1, $2)", 
          [usr_email, hash]
        );
        
          res.json(insert);

      });
  });

    

  } 
  catch (error) {
    console.log(error.message);
  }

})


app.listen(3001, function() {

  console.log("Server running on port 3001");

});