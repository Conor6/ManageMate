const express = require('express');
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());


app.post('/addcourt', async(req, res) => {
  try {

    const { crt_name } = req.body;

    const insert = await pool.query(
      "INSERT INTO court (crt_name) VALUES($1)", 
      [crt_name]
    );

    res.json(insert);

    console.log(req.body);
    
  } 
  catch (error) {
    console.log(error.message);
  }

})





app.listen(3000, function() {

  console.log("Server running on port 3000");

});