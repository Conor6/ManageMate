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

    const { gym_id } = req.body;
    const { crt_name } = req.body;
    const { crt_desc } = req.body;

    const insert = await pool.query(
      "INSERT INTO court (gym_id, crt_name, crt_desc) VALUES($1, $2, $3)", 
      [gym_id, crt_name, crt_desc]
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


    console.log(user.rows.length);

    if(user.rows.length === 0){

      return res.status(401).json("Email or Password incorrect")

    }

    let db_password = user.rows[0].usr_password;

  
    const validPassword = await bcrypt.compare(password, db_password);

    console.log("Valid Password: ");
    console.log(validPassword);

    if(!validPassword){

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

    const { gym_name } = req.body;
    const { gym_address } = req.body;
    const { gym_opening_hours } = req.body;


    const insert = await pool.query(
      "INSERT INTO gym (gym_name, gym_address, gym_opening_hours) VALUES($1, $2, $3)", 
      [gym_name, gym_address, gym_opening_hours]
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

        console.log(res.rows);



      });
  });

    

  } 
  catch (error) {
    console.log(error.message);
  }

})

app.get('/gymlist', async(req, res) => {
  try {


    const select = await pool.query(
      "SELECT * FROM gym;", 
    );
    
    res.json(select);

      
  } 
  catch (error) {
    console.log(error.message);
  }

})



app.listen(3001, function() {

  console.log("Server running on port 3001");

});