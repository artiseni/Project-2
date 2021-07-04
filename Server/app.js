const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./connect/db')
const port = 5000

app.use(cors());
app.options('*', cors());
app.use(express.json()) // req body


// All blogs
app.post('/posts', async (req, res) => {
    try {
        const displayData = await pool.query(`SELECT username, title, content
        FROM users
        INNER JOIN post on username = post_by`)
        res.json(displayData.rows)

    } catch (err) {
        console.error(err.message);
    }
})

// display
app.post('/data', async (req, res) => {
    try {
        const displayData = await pool.query(`SELECT * FROM users`)
        res.json(displayData.rows)

    } catch (err) {
        console.error(err.message);
    }
})

// create
app.post('/signup', async (req, res) => {
    try {

        const data = req.body
        const username = data['username']
        const email = data['email']
        const password = data['password']

        const validEmail = await pool.query(`SELECT email FROM users WHERE email LIKE '${email}'`)

        if (validEmail.rows.length === 0) {
            const sql = `INSERT INTO users VALUES (default, '${username}', '${email}', '${password}')`
            const addData = await pool.query(sql)

            if (addData.rowCount === 1) {
                const sqlDataUser = `SELECT username, title, content FROM users LEFT JOIN post ON username = post_by WHERE email = '${email}'`
                const dataUser = await pool.query(sqlDataUser)

                if (dataUser.rowCount === 0) {
                    res.status(400).send({ "message" : "Data error!"})
                } else {
                    res.json(dataUser.rows)
                }
                
            } else {
                res.status(400).send({ "message" : "Data gagal ditambahkan!"})
            }
        } else {
            res.status(400).send({ "message" : "Email sudah terdaftar!"})
        }


    } catch (err) {
        console.error(err.message);
    }
})

// login
app.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password
        const sql = `SELECT email, password FROM users WHERE email = '${email}' AND password = '${password}'`
        const passData = await pool.query(sql)
        // console.log(req.body)
        // res.json(passData.rows)

        if (passData.rows.length === 1) {

            const sqlDataUser = `SELECT username, title, content FROM users LEFT JOIN post ON username = post_by WHERE email = '${email}'`
            const dataUser = await pool.query(sqlDataUser)

            if (dataUser.rowCount === 0) {
                res.status(400).send({ "message" : "Data error!"})
            } else {
                res.json(dataUser.rows)
            }
            
        } else {
            res.status(400).send({ "message" : "Email atau password salah!"})
        }

    } catch (err) {
        console.error(err.message);
    }
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})