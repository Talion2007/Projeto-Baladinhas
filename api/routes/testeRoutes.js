// baladaRoutes.js
const express = require("express");
const router = express.Router();
const baladaController = require("../controllers/testeController");

// Rota para obter todas as baladas
router.get("/", baladaController.getAll);

// Rota para obter baladas por cidade
router.get("/cidade/:cidade", baladaController.getByCidade);

// Rota para obter baladas por data
router.get("/data/:data", baladaController.getByData);

// Rota para criar uma nova balada
router.post("/", baladaController.create);

// Rota para atualizar uma balada existente
router.put("/:id", baladaController.update);

// Rota para deletar uma balada
router.delete("/:id", baladaController.delete);

module.exports = router;
