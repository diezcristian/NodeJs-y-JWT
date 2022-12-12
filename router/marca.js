const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const Marca = require("../models/Marcas");

const router = Router();

router.post("/", async (req, res) => {
  try {
    let marca = new Marca();
    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaCreacion = new Date();
    marca.fechaActualizacion = new Date();

    marca = await marca.save();
    res.send(marca);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/", validarJWT, async (req, res) => {
  try {
    const marcas = await Marca.find();
    res.send(marcas);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.put("/:marcaId", async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.marcaId);

    if (!marca) {
      return res.send(`La marca no existe`);
    }

    marca.nombre = req.body.nombre;
    marca.estado = req.body.estado;
    marca.fechaActualizacion = new Date();

    marca = await marca.save();
    res.send(marca);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/:marcaId", async (req, res) => {
  try {
    let marca = await Marca.findById(req.params.marcaId);

    if (!marca) {
      return res.status(400).send("Usuario no existe");
    }

    res.send(marca);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send(`ocurrio un error ${error}`);
  }
});

module.exports = router;
