const Pool = require("pg").Pool

const pool = new Pool({
    user : "linux",
    password : "password",
    database : "appdata",
    port : "5432"
})

module.exports = pool
