const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session')
const db = require('../db');

const router = express.Router();



router.post('/register', async (req, res)=> {
    const {name, email, password} = req.body

    const hashPassword = await bcrypt.hash(password, 10);

    db.get(
        `SELECT * FROM users WHERE email=?`,[email], (err, row) => {
            if(row){
              return res.status(400).json({error: 'User already exist'})
            }
            
            db.run(
                `INSERT INTO users (name, email, password) VALUES (?,?,?)`,[name, email, hashPassword]
            )
           res.status(201).json({message: 'User registered successfully'})
        }
    )
});

router.post('/login', (req, res) => {
    const {email, password} = req.body

     if (!email || !password) {
    return res.status(400).json({ error: "Enter both email and password" });
  }

    db.get(
        'SELECT * FROM users WHERE email=?',[email], (err, row) => {
            if(err){
                return res.status(500).json({error: 'Database error'})
            }
            if(!row){
                return res.status(400).json({error: 'Invalid email'})
            }

            bcrypt.compare(password, row.password)
            .then(match => {
                if(!match){
                return res.json({error: 'Invalid email or password'})
            }

             req.session.user = { id: row.id, name: row.name, email: row.email}
            res.json({message: 'Login Successful'})
            })
            .catch(err => {
                console.error(err);
                    res.status(500).json({error: 'Internal server error'})
                
            })
        }
    )


router.post('/logout', (req, res) => {
        req.session.destroy(()=>{
            res.clearCookie("connect.sid");
            res.json({message: 'Loggedout successfully'})
        })
    })
})

module.exports = router;