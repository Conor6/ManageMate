const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require('./jwtGenerator');
const validInfo = require('./Middleware/validinfo');
const authorisation = require('./Middleware/authorisation');

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

//Post request to log a user in
app.post('/login', validInfo, async(req, res) => {
  try {

    //Get information from front end
    const email = req.body.usr_email;
    const  password = req.body.usr_password;
    
    //Create select query to see if user exists
    const user = await pool.query("SELECT * FROM user_table WHERE usr_email = $1", [email]);

    if(user.rows.length === 0){

      return res.status(401).json("Email or Password incorrect")

    }

    //Get the password that is stored in the database
    let db_password = user.rows[0].usr_password;

  
    //Compare the database password and the password that the user entered
    const validPassword = await bcrypt.compare(password, db_password);

    //validPassword returns true or false, if it is false, then the two passwords do not match
    if(!validPassword){

      return res.status(401).json("Email or Password incorrect!");

    }

    //Generate token for the user
    const token = jwtGenerator(user.rows[0].usr_id, user.rows[0].usr_email, user.rows[0].usr_type)
    
    res.json({token});


  } 
  catch (error) {

    console.log(error.message);

    res.status(500).send("Server Error");

  }

})

app.get("/verify", authorisation, async (req,res) => {

  try{

    res.json(true);

  }
  catch(error) {

    console.error(error.message)

  }

});

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

app.post('/signup', validInfo, async(req, res) => {
  
  try {

    const { usr_email, usr_password, usr_type} = req.body;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(usr_password, salt);

    const insertUser = await pool.query(
      "INSERT INTO user_table (usr_email, usr_password, usr_type) VALUES($1, $2, $3)", 
      [usr_email, hash, usr_type]
    );

    const checkUser = await pool.query("SELECT * FROM user_table WHERE usr_email = $1", 
    [usr_email]);



    let db_id = checkUser.rows[0].usr_id;
    let db_email = checkUser.rows[0].usr_email;
    let db_user_type = checkUser.rows[0].usr_type;

    const token = jwtGenerator(db_id, db_email, db_user_type);

    console.log(token);

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