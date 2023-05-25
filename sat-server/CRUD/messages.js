const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE MENSAJES--------------- */
// CRUD de mensajes
// create
router.post('/orders/messages/', async (req, res) => {
    const { user_id, message, orderId } = req.body;
  
    const fechaActual = new Date();
  
    const dia = fechaActual.getDate().toString().padStart(2, '0');
    const mes = (fechaActual.getMonth() + 1).toString().padStart(2, '0');
    const anio = fechaActual.getFullYear().toString();
    const hora = fechaActual.getHours().toString().padStart(2, '0');
    const minutos = fechaActual.getMinutes().toString().padStart(2, '0');
  
    const created_at = `${dia}/${mes}/${anio} ${hora}:${minutos}`;
  
    const values = [
      message,
      user_id,
      created_at,
      orderId,
    ]
    const qCreateNote = "INSERT INTO messages (message, user_id, created_at, orderId) VALUES (?, ?, ?, ?)";
    db.query(qCreateNote, values, (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send("No se pudo agregar la nota.");
      }
      return res.status(200).send("Nota agregada correctamente.");
    });    
  });
  // read
  router.get("/orders/messages/:id", (req, res) => {
    const orderId = req.params.id;
    const qgetNotes = "SELECT * FROM messages JOIN users ON messages.user_id = users.idusers WHERE orderId = ?";
    db.query(qgetNotes, [orderId], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(data);
    });
  })
  // update
  // delete
  router.delete("/orders/messages/:id", (req, res) => {
    const messageId = req.params.id;
    const qdeleteOrder = " DELETE FROM messages WHERE idmessages = ? ";
  
    db.query(qdeleteOrder, [messageId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })

  module.exports = router