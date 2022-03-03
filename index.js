const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require('./jwtGenerator');


app.use(cors());
app.use(express.json());



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


    console.log("/signup");

    const { usr_email, usr_password, usr_type} = req.body;

    console.log(usr_email);
    console.log(usr_password);
    console.log(usr_type);


    const checkUser = await pool.query("SELECT * FROM user_table WHERE usr_email = $1", 
    [usr_email]);

    if(checkUser.rowCount > 0)
    {
      console.log("User already exists");
      
    }

    //res.json(checkUser.rows);
    

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(usr_password, salt);

    const insertUser = await pool.query(
      "INSERT INTO user_table (usr_email, usr_password, usr_type) VALUES($1, $2, $3)", 
      [usr_email, hash, usr_type]
    );

    

    console.log("JWT call");

    const token = jwtGenerator(insertUser.rows.usr_id);

    console.log(insertUser);

    console.log("After JWT call");

    return res.json({ token });
    

    

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