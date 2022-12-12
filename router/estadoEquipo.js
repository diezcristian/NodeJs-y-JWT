const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const EstadoEquipo = require("../models/EstadoEquipo");

const router = Router();

router.post("/", async (req, res) => {
  try {
    let estadoEquipo = new EstadoEquipo();
    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaCreacion = new Date();
    estadoEquipo.fechaActualizacion = new Date();

    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/", async (req, res) => {
  try {
    const tipos = await EstadoEquipo.find();
    res.send(tipos);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.put("/:estadoEquipoId", async (req, res) => {
  try {
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);

    if (!estadoEquipo) {
      return res.send(`Ese estado no existe`);
    }

    estadoEquipo.nombre = req.body.nombre;
    estadoEquipo.estado = req.body.estado;
    estadoEquipo.fechaActualizacion = new Date();

    estadoEquipo = await estadoEquipo.save();
    res.send(estadoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/:estadoId", validarJWT, async (req, res) => {
  try {
    let estadoEquipo = await EstadoEquipo.findById(req.params.estadoId);

    if (!estadoEquipo) {
      return res.status(400).send("Estado no existe");
    }

    res.send(estadoEquipo);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send(`ocurrio un error ${error}`);
  }
});

module.exports = router;
