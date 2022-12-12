const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const TipoEquipo = require("../models/TipoEquipo");

const router = Router();

router.post("/", async (req, res) => {
  try {
    let tipoEquipo = new TipoEquipo();
    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaCreacion = new Date();
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();
    res.send(tipoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/", validarJWT, async (req, res) => {
  try {
    const tipos = await TipoEquipo.find();
    res.send(tipos);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.put("/:tipoEquipoId", async (req, res) => {
  try {
    let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

    if (!tipoEquipo) {
      return res.send(`Ese tipo de equipo no existe`);
    }

    tipoEquipo.nombre = req.body.nombre;
    tipoEquipo.estado = req.body.estado;
    tipoEquipo.fechaActualizacion = new Date();

    tipoEquipo = await tipoEquipo.save();
    res.send(tipoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/:tipoId", async (req, res) => {
  try {
    let tipoEquipo = await TipoEquipo.findById(req.params.tipoId);

    if (!tipoEquipo) {
      return res.status(400).send("Usuario no existe");
    }

    res.send(tipoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send(`ocurrio un error ${error}`);
  }
});

module.exports = router;
