const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE SISTEMA DE REPUESTOS----------------- */
// create
router.post("/stock/item", (req, res) => {
    const { repuesto } = req.body;
    const qCreateItem = "INSERT INTO repuestos (repuesto) VALUES (?)";
    db.query(qCreateItem, [repuesto], (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send("No se pudo agregar el repuesto.");
      }
      return res.status(200).send("Repuesto agregado correctamente.");
    });    
  })
  // read
  router.get("/stock/item", (req, res) => {
    const qgetItem = "SELECT * FROM repuestos LIMIT 50";
    db.query(qgetItem, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al obtener la lista de repuestos');
      } else {
        return res.status(200).send(result);
      }
    });
  })
  // update
  router.put("/stock/item/:id", (req, res) => {
    const itemId = req.params.id;
    const qupdateItem = "UPDATE repuestos SET `repuesto` = ? WHERE idrepuestos = ?";
    const { repuesto } = req.body;
    
    db.query(qupdateItem, [repuesto,itemId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })
  // delete
  router.delete("/stock/item/:id", (req, res) => {
    const itemId = req.params.id;
    const qdeleteItem = " DELETE FROM repuestos WHERE idrepuestos = ? ";
  
    db.query(qdeleteItem, [itemId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })
  router.get('/stock/item/:nombre', (req, res) => {
  
    const nombre = req.params.nombre;
    const sql = `SELECT idrepuestos FROM repuestos WHERE repuesto = ?`;
  
    db.query(sql, [nombre], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener el ID del repuesto');
      } else if (result.length === 0) {
        res.status(404).send('No se encontró ningún repuesto con ese nombre');
      } else {
        const repuestoId = result[0].idrepuestos;
        res.status(200).send(`${repuestoId}`);
      }
    });
  });

  module.exports = router