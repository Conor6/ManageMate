const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require('./jwtGenerator');
const validInfo = require('./Middleware/validinfo');
const authorisation = require('./Middleware/authorisation');
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
require("dotenv").config();
const jwt = require('jsonwebtoken');

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());
app.use(express.json());


app.post('/add-gym-picture', async(req,res) => {
  try {
    const {picture} = req.body;

    console.log(picture);

  } 
  catch (error) {
    console.log(error.message);
  }
})

app.post('/get-user-apps', authorisation, async(req,res) => {
  try {
    const {usr_id} = req.body;;

    const getTeamApps = await pool.query(
      "SELECT * FROM booking_table where usr_id = $1;", 
      [usr_id]
    );
    res.json(getTeamApps);
  } 
  catch (error) {
    console.log(error.message);
  }
})

app.post('/get-team-apps', authorisation, async(req,res) => {
  try {
    const {team} = req.body;;

    const getTeamApps = await pool.query(
      "SELECT * FROM booking_table where team = $1;", 
      [team]
    );
    res.json(getTeamApps);
  } 
  catch (error) {
    console.log(error.message);
  }
})

app.get('/getapps', authorisation, async(req,res) => {
  try {

    const getApps = await pool.query(
      "SELECT * FROM booking_table;", 
    );

    res.json(getApps);
  } 
  catch (error) {
    console.log(error.message);
  }
})


app.post('/get-team', authorisation, async(req,res) => {
  try {
    const {t_name} = req.body;

    const selectUserTeams = await pool.query(
      "SELECT * FROM team where t_name = $1;", 
      [t_name]
    );
    res.json(selectUserTeams);
  } 
  catch (error) {
    console.log(error.message);
  }
})

app.post('/getuserteams', async(req,res) => {
  try {
    const usr_id = req.body.usr_id;

    const selectUserTeams = await pool.query(
      "SELECT usr_teams FROM user_table where usr_id = $1;", 
      [usr_id]
    );

    res.json(selectUserTeams);
  } 
  catch (error) {
    console.log(error);
  }
})

app.post('/register-user', authorisation, async(req,res) => {
  try {

    const usr_id = req.body.usr_id;
    const password = req.body.usr_password;
    const teams = req.body.usr_team;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const registerUser = await pool.query(
      'UPDATE user_table SET usr_password = $2, usr_teams = $3 where usr_id = $1;', 
      [usr_id, hash, teams,]
    );
    res.json(registerUser);
  } 
  catch (error) {
    console.log(error.message);
  }
})

app.get('/get-teams', async(req,res) => {
  try {
    const select = await pool.query(
      "SELECT t_name FROM team;", 
    );
    res.json(select);
  } 
  catch (error) {
    console.log(error);
  }
})

app.get("/signup/:token", async(req,res) => {

  const {token} = req.params;

  jwt.verify(token, process.env.jwtSecret, (error, decoded) =>{
    if(error){
      console.log("Error");
      res.json(error);
    }
    else{
      res.json(decoded.user);
    }
  })
})

app.post('/addcourt', authorisation, async(req, res) => {
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

app.post('/addgym', authorisation, async(req, res) => {
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

app.post('/createaccount', validInfo, async(req, res) => {
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

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    })

    await transport.sendMail({
      from: process.env.MAIL_FROM,
      to: db_email,
      subject: "ManageMate - Create Account",
      html: `<div className="email">
      <h2>You have been invited to create an account with ManageMate!</h2>
      <p>Click the link to create your account:</p>
      <a href="http://localhost:3000/signup/${token}">Click here to create your account!</a>
      
      <p>All the best,</p>
      <p>ManageMate</p>
      </div>`
    })

  } 
  catch (error) {
    console.log(error.message);
  }
})

app.get('/gymlist', authorisation, async(req, res) => {
  try {

    const select = await pool.query(
      "SELECT * FROM gym;", 
    );

    res.json(select);

  } 
  catch (error) {
    console.log(error);
  }
})

app.post('/appointment', async(req, res) =>{

  const { id, title, start_date, end_date, rRule, usr_id, activity, gym, team}  = req.body;

  try {
    const insertAppointment = await pool.query(
      'INSERT INTO booking_table (id, title, "startDate", "endDate", "rRule", usr_id, activity, gym, team) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
      [id, title, start_date, end_date,rRule, usr_id, activity, gym, team]
    );
    res.json(insertAppointment);   
  } catch (error) {
    console.log(error);
  }
})

app.get('/getappointments', authorisation, async(req,res) => {

  try {
    const getAppointments = await pool.query(
      "SELECT * FROM booking_table;"
    );
    res.json(getAppointments);
  } catch (error) {
    console.log(error);
  }
});

app.post('/delete-appointment', async(req,res) => {
  try {
    const {id} = req.body;

    const deleteAppointment = await pool.query(
      'DELETE from booking_table WHERE id = $1', 
      [id]
    );
    res.json(deleteAppointment);
  } catch (error) {
    console.log(error);
  }
});

app.post('/update-appointment', async(req,res) => {

  try {
    const {id, title, startDate, endDate, rRule, usr_id, activity, gym, team, exDate} = req.body;

    const updateAppointment = await pool.query(
      'UPDATE booking_table SET title = $2, "startDate" = $3, "endDate" = $4, "rRule" = $5, usr_id = $6, activity = $7, gym = $8, team = $9, "exDate" = $10 WHERE id = $1', 
      [id, title, startDate, endDate, rRule, usr_id, activity, gym, team, exDate]
    );
    res.json(updateAppointment);
  } catch (error) {
    console.log(error);
  }
});

app.get('/getgyms', authorisation, async(req,res) => {
  try {
    const getGyms = await pool.query(
      "SELECT gym_name FROM gym;"
    );
    res.json(getGyms);
  } catch (error) {
    console.log(error);
  }
});

app.get('/user-info', authorisation, async(req,res) => {
  try {
    res.json(req.user);

  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, function() {

  console.log("Server running on port 3001");

});