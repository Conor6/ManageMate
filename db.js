const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "KingswoodIreland1",
    host: "localhost",
    port: 5432,
    database: "gym_management"
});


module.exports = pool;