const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');

/*-----------------CREACION DE CUENTAS--------------- */
// CRUD de cuentas
// create
router.post('/', async (req, res) => {
    const { account } = req.body;

    const cajaBranch = `Caja${account}`
    
    const values = [
        account,
        cajaBranch
    ]
  
    const qAccount = 'SELECT * FROM accounts WHERE account = ? OR account = ?'
  
    db.query(qAccount, values, (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send(err);
      }
      if(data.length > 0){
        return res.status(200).send(data);
      } else {
        const qCreateAccount = "INSERT INTO accounts (account) VALUES (?), (?)";
        db.query(qCreateAccount, values, (err, result) => {
          if (err) {
            console.log("error: ", err);
            return res.status(400).send("No se pudieron agregar las cuentas.");
          }
          return res.status(200).send(data);
        });    
      }
    });
  });
  // read
  router.get("/", (req, res) => {
    const qgetAccount = "SELECT * FROM accounts";
    db.query(qgetAccount, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(data);
    });
  })
  // update
  router.put("/:id", (req, res) => {
    const accountId = req.params.id;
    const { account } = req.body;
  
    const qAccount = 'SELECT * FROM accounts WHERE account = ?';
  
    db.query(qAccount, [account], (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      if(data.length > 1){
        return res.status(400).send("Esta cuenta ya existe");
      } else {
        const qupdateAccount = "UPDATE accounts SET `account` = ? WHERE idaccount = ?";
        db.query(qupdateAccount, [account, accountId], (err, data) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json(data);
        }); 
      }
    });
  })
  // delete
  router.delete("/:id", (req, res) => {
    const accountId = req.params.id;
    const qdeleteAccount = " DELETE FROM accounts WHERE idaccount = ? ";
  
    db.query(qdeleteAccount, [accountId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })

  module.exports = router