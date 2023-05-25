const express = require('express');
const router = express.Router();

// Agregar base de datos
const db = require('../database/dbConfig');
/*-----------------CREACION DE CATEGORIAS--------------- */
// CRUD de categorias
// create
router.post('/movcategories', async (req, res) => {
    const { categories } = req.body;
  
    const qCategories = 'SELECT * FROM movcategories WHERE categories = ?'
  
    db.query(qCategories, [categories], (err, data) => {
      if (err) {
        console.log("error: ", err);
        return res.status(400).send(err);
      }
      if(data.length > 0){
        return res.status(200).send(data);
      } else {
        const qCreateCategory = "INSERT INTO movcategories (categories) VALUES (?)";
        db.query(qCreateCategory, [categories], (err, result) => {
          if (err) {
            console.log("error: ", err);
            return res.status(400).send("No se pudo agregar la categoria.");
          }
          return res.status(200).send(data);
        });    
      }
    });
  });
  // read
  router.get("/movcategories", (req, res) => {
    const qgetCategoriest = "SELECT * FROM movcategories";
    db.query(qgetCategoriest, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }
      return res.status(200).json(data);
    });
  })
  // update
  router.put("/account/:id", (req, res) => {
    const categoriesId = req.params.id;
    const { categories } = req.body;
  
    const qCategories = 'SELECT * FROM movcategories WHERE categories = ?';
  
    db.query(qCategories, [categories], (err, data) => {
      if (err) {
        return res.status(400).send(err);
      }
      if(data.length > 1){
        return res.status(400).send("Esta categoria ya existe");
      } else {
        const qupdateCategories = "UPDATE movcategories SET `categories` = ? WHERE idmovcategories = ?";
        db.query(qupdateCategories, [categories, categoriesId], (err, data) => {
          if (err) return res.status(400).send(err);
          return res.status(200).json(data);
        }); 
      }
    });
  })
  // delete
  router.delete("/account/:id", (req, res) => {
    const categoriesId = req.params.id;
    const qdeleteCategories = " DELETE FROM movcategories WHERE idmovcategories = ? ";
  
    db.query(qdeleteCategories, [categoriesId], (err, data) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json(data);
    });
  })

  module.exports = router