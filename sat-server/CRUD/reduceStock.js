const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE SISTEMA DE REPUESTOS USADOS----------------- */
router.post("/", (req, res) => {
    const qInsertReduceStock = "INSERT INTO reducestock (orderid, userid, stockid, date) VALUES (?, ?, ?, ?)";
    const qupdateStock = "UPDATE stock SET `cantidad` = ? WHERE idstock = ?";
  
    const { orderId, userId, stockId, cantidad } = req.body;
    // Obtener la fecha y hora actual
    const currentDate = new Date();
  
    // Obtener los componentes de la fecha y hora
    const day = currentDate.getDate(); // Día del mes (1-31)
    const month = currentDate.getMonth() + 1; // Mes (0-11). Sumamos 1 porque los meses se indexan desde 0.
    const year = currentDate.getFullYear(); // Año (ej. 2023)
    const hour = currentDate.getHours(); // Hora (0-23)
    const minutes = currentDate.getMinutes(); // Minutos (0-59)
  
    // Crear una cadena de texto con el formato deseado
    const newDate = `${day}/${month}/${year} ${hour}:${minutes}`;
  
    const values = [
      orderId,
      userId,
      stockId,
      newDate,
    ]
    db.query(qupdateStock, [cantidad,stockId], (err, data) => {
      if (err) return res.status(400).send(err);
      
      db.query(qInsertReduceStock, values, (err, data) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json(data);
      });
    });
  
  })// read
  router.get("/", (req, res) => {
    const qgetStock = "SELECT idreducestock, idstock, cantidad, repuesto, precio_compra, nombre, username, reducestock.date  FROM reducestock JOIN users ON reducestock.userid = users.idusers JOIN stock ON reducestock.stockid = stock.idstock JOIN repuestos ON stock.repuesto_id = repuestos.idrepuestos JOIN proveedores ON stock.proveedor_id = proveedores.idproveedores;";
    db.query(qgetStock, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json("error al obtener la lista de Stock");
      }
      return res.status(200).json(data);
    });
  })
  router.put("/:id", (req, res) => {
    const qupdateStock = "UPDATE stock SET `cantidad` = ? WHERE idstock = ?";
    const stockId = req.params.id;
    const { cantidad } = req.body;
    
    db.query(qupdateStock, [cantidad,stockId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })
  router.delete("/:id", (req, res) => {
    const stockReduceId = req.params.id;
    const qdeleteStock = " DELETE FROM reducestock WHERE idreducestock = ? ";
  
    db.query(qdeleteStock, [stockReduceId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })

  module.exports = router