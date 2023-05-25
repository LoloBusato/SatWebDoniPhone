const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
// CRUD de usuarios
// create
router.post("/", (req, res) => {
  const { username, password } = req.body;

  const qexist = 'SELECT * FROM users WHERE username = ?'
  const values = [username, password]
  const qcreate = 'INSERT INTO users (username, password) VALUES (?, ?)'

  db.query(qexist, [username], (err, data) => {
    if (err) {
      console.log("error: ", err);
      return res.send(err);
    }
    if(data.length > 0){
      return res.status(400).send("Usuario con ese nombre ya creado");
    } else {
      db.query(qcreate, values, (err, data) => {
        if (err) {
          console.log("error: ", err);
          return res.send(err);
        }
        return res.status(200).send("Usuario creado con exito")
      })
    }
  });
})
// read
router.get("/", (req, res) => {
  const qgetUsers = "SELECT * FROM users";
  db.query(qgetUsers, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    }
    return res.status(200).json(data);
  });
})
// update
router.put("/:id", (req, res) => {
  const userId = req.params.id;
  const qupdateUser = "UPDATE users SET `username`= ?, `password`= ? WHERE idusers = ?";

  const values = [
    req.body.username,
    req.body.password
  ];

  db.query(qupdateUser, [...values,userId], (err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json(data);
  });
})
// delete
router.delete("/:id", (req, res) => {
  const userId = req.params.id;
  const qdeleteUser = " DELETE FROM users WHERE idusers = ? ";

  db.query(qdeleteUser, [userId], (err, data) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json(data);
  });
})
/* ------------------------------------------------------------- */
module.exports = router