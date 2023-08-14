const express = require('express')
const path = require('path')
const app  = express()
const db = require('./config')
const bodyParser = require('body-parser')
const port = +process.env.PORT || 3000


app.use(express.static('./static'))

app.get('/users', (req, res)=> {
    const query = `SELECT * FROM Users; `
    db.query(query, (err, data)=> {
        if(!err) {
            res.status(200).json(
                {
                    results: data
                }
            )
        }
        res.status(404).json(
            {
                msg: "An error occured."
            }
        )
    })
})

app.delete('/users/:userID', (req, res)=> {
    const query = `DELETE userID, firstName, lastName FROM users WHERE userID = 1;`
    db.query(query, (err, data)=> {
        if(!err) {
            res.status(200).json(
                {
                    results: data
                }
            )
        }
        res.status(404).json(
            {
                msg: "An error occured."
            }
        )
    })
})

app.get('/',(req,res)=>{
    res.status(200).sendFile(path.resolve(__dirname, './static/html/index.html'))

})

app.get('/about',(req,res)=>{
    res.status(200).json(
        {
            msg:"About Page"
        }
    )
})

app.post("/register", bodyParser.json(), (req, res) => {
    const query = `
      INSERT INTO Users SET ?;
    `;
    db.query(query, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Registration was successful."
      });
    });
  });



app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})

//retrieve a single user
app.get('/user/:id', (req, res)=>{
    const query = `
    SELECT userID, firstName, lastName
    FROM users
    WHERE userID = ${req.params.id};
    `

    db.query(query, (err, data)=>{
        if(err) throw(err)
        res.json(
            {
                status: res.statusCode,
                results: data
            }
        )
    })
})

//Put => Update
app.put('/user/:id', bodyParser.json(), (req, res)=> {
    const query = `
    UPDATE Users SET ?
    WHERE userID = ?;
    `

    db.query(query, [req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json(
            {
                status: res.statusCode,
                msg:"The user record is updated."
            }
        )
    })
})

//Patch 
app.patch('/user/:id', bodyParser.json(), (req, res)=> {
    const query = `
    UPDATE Users SET ?
    WHERE userID = ?;
    `

    db.query(query, [req.body, req.params.id], (err)=>{
        if (err) throw err
        res.json(
            {
                status: res.statusCode,
                msg:"The user record is updated."
            }
        )
    })
})

//delete a new record
app.delete('/user/:id', (req, res)=>{
    const query = `
    DELETE FROM Users
    WHERE userID = ${req.params.id};
    `

    db.query(query, (err)=>{
        if (err) throw err;
        res.json(
            {
                status: res.statusCode,
                msg: "The user record has been deleted."
            }
        )
    })
})

//register a user
app.post('/register', bodyParser.json(), (req, res) => {
    const query = `
      INSERT INTO Users SET ?;
    `;
    db.query(query, [req.body], (err) => {
      if (err) throw err;
      res.json({
        status: res.statusCode,
        msg: "Registration was successful.",
      });
    })
  })