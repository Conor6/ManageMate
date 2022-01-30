const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


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


app.listen(3001, function() {

  console.log("Server running on port 3001");

});