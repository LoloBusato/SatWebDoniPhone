const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE SISTEMA DE PROVEEDORES----------------- */
// create
router.post("/supplier", (req, res) => {
    const { nombre, telefono, direccion } = req.body;
    const values = [
      nombre,
      telefono, 
      direccion
    ]
    console.log(values)
  
    const qCreateSupplier = "INSERT INTO proveedores (nombre, telefono, direccion) VALUES (?, ?, ?)";
    db.query(qCreateSupplier, values, (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send("No se pudo agregar el proveedor.");
      }
      return res.status(200).send("Proveedor agregado correctamente.");
    });    
  })
  // read
  router.get("/supplier", (req, res) => {
    const qgetSupplier = `SELECT * FROM proveedores LIMIT 20`;
    db.query(qgetSupplier, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error al obtener la lista de proveedores');
      } else {
        return res.status(200).json(result);
      }
    });
  })
  // update
  router.put("/supplier/:id", (req, res) => {
    const supplierId = req.params.id;
    const qupdateSupplier = "UPDATE proveedores SET `nombre` = ?, `telefono` = ?, `direccion` = ? WHERE idproveedores = ?";
    const { nombre, telefono, direccion } = req.body;
    
    const values = [
      nombre,
      telefono, 
      direccion
    ]
    db.query(qupdateSupplier, [...values,supplierId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })
  // delete
  router.delete("/supplier/:id", (req, res) => {
    const supplierId = req.params.id;
    const qdeleteSupplier = " DELETE FROM proveedores WHERE idproveedores = ? ";
  
    db.query(qdeleteSupplier, [supplierId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })
  router.get('/supplier/:nombre', (req, res) => {
  
    const nombre = req.params.nombre;
    const sql = `SELECT idproveedores FROM proveedores WHERE nombre = ?`;
  
    db.query(sql, [nombre], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al obtener el ID del proveedor');
      } else if (result.length === 0) {
        res.status(404).send('No se encontró ningún proveedor con ese nombre');
      } else {
        const proveedorId = result[0].idproveedores;
        res.status(200).send(`${proveedorId}`);
      }
    });
  });
  /* ------------------------------------------------------------- */

  module.exports = router