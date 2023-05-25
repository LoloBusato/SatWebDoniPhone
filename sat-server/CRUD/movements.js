const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE MOVIMIENTOS--------------- */
// CRUD de movimientos
// create
router.post('/movements', async (req, res) => {
    const { accountId, movCategoriesId, userId, movement, valueUsd, valuePesos, valueTrans, valueMp } = req.body;

    const fechaActual = new Date();
    const anio = (fechaActual.getFullYear()).toString().slice(-2);
    const mes = ('0' + (fechaActual.getMonth() + 1)).slice(-2);
    const dia = ('0' + fechaActual.getDate()).slice(-2);
    const fecha = `${dia}/${mes}/${anio}`;

    const values = [
        accountId,
        movCategoriesId,
        userId,
        movement,
        valueUsd, 
        valuePesos,
        valueTrans, 
        valueMp,
        fecha
    ]
  
    const qCreateMove= "INSERT INTO movements (account_id, movcategories_id, user_id, movement, value_usd, value_pesos, value_trans, value_mp, fecha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(qCreateCategory, values, (err, result) => {
        if (err) {
        console.log("error: ", err);
        return res.status(400).send("No se pudo agregar el movimiento.");
        }
        return res.status(200).send(data);
    });    
  });
  // read
  router.get("/movements", (req, res) => {
    const qgetMovements = "SELECT * FROM movements";
    db.query(qgetMovements, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(data);
    });
  })
  // update
  router.put("/movements/:id", (req, res) => {
    const moveId = req.params.id;
    const { accountId, movCategoriesId, userId, movement, valueUsd, valuePesos, valueTrans, valueMp } = req.body;
  
    const values = [

    ]
    const qupdateMovement = "UPDATE movements SET `accountId` = ?, `movCategoriesId` = ?, `userId` = ?, `movement` = ?, `valueUsd` = ?, `valuePesos` = ?, `valueTrans` = ?, `valueMp` = ? WHERE idmovements = ?";
    db.query(qupdateMovement, [...values, moveId], (err, data) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json(data);
    }); 
  })
  // delete
  router.delete("/movements/:id", (req, res) => {
    const moveId = req.params.id;
    const qdeleteMovement = " DELETE FROM movements WHERE idmovements = ? ";
  
    db.query(qdeleteMovement, [moveId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })

  module.exports = router