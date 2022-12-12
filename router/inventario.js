const { Router } = require("express");
const { validarInventario } = require("../helpers/validar-inventario");
const { validarJWT } = require("../middlewares/validar-jwt");
const Inventario = require("../models/Inventario");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const validaciones = validarInventario(req);

    if (validaciones.length > 0) {
      return res.status(400).send(validaciones);
    }

    const existeInventarioSerial = await Inventario.findOne({
      serial: req.body.serial,
    });

    if (existeInventarioSerial) {
      return res.status(400).send("ese serial ya fue asignado a otro equipo");
    }

    let inventario = new Inventario();

    inventario.serial = req.body.serial;
    inventario.modeloEquipo = req.body.modeloEquipo;
    inventario.descripcion = req.body.descripcion;
    inventario.color = req.body.color;
    inventario.foto = req.body.foto;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.EstadoEquipo = req.body.EstadoEquipo._id;
    inventario.fechaCreacion = new Date();
    inventario.fechaActualizacion = new Date();

    inventario = await inventario.save();
    res.send(inventario);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send("ocurrio un error");
  }
});

router.get("/", validarJWT, async (req, res) => {
  try {
    const inventarios = await Inventario.find().populate([
      {
        path: "usuario",
        select: "nombre email estado",
      },
      {
        path: "marca",
        select: "nombre estado",
      },
      {
        path: "tipoEquipo",
        select: "nombre estado",
      },
      {
        path: "EstadoEquipo",
        select: "nombre estado",
      },
    ]);
    res.send(inventarios);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send("ocurrio un error");
  }
});

router.put("/:inventarioId", async (req, res) => {
  try {
    let inventario = await Inventario.findById(req.params.inventarioId);

    if (!inventario) {
      return res.status(400).send("Inventario no existe");
    }

    const existeInventarioSerial = await Inventario.findOne({
      serial: req.body.serial,
      _id: {
        $ne: inventario._id,
      },
    });

    if (existeInventarioSerial) {
      return res.status(400).send("ese serial ya fue asignado a otro equipo");
    }

    inventario.serial = req.body.serial;
    inventario.modeloEquipo = req.body.modeloEquipo;
    inventario.descripcion = req.body.descripcion;
    inventario.color = req.body.color;
    inventario.foto = req.body.foto;
    inventario.fechaCompra = req.body.fechaCompra;
    inventario.precio = req.body.precio;
    inventario.usuario = req.body.usuario._id;
    inventario.marca = req.body.marca._id;
    inventario.tipoEquipo = req.body.tipoEquipo._id;
    inventario.EstadoEquipo = req.body.EstadoEquipo._id;
    inventario.fechaActualizacion = new Date();

    inventario = await inventario.save();
    res.send(inventario);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send("ocurrio un error");
  }
});

router.get("/:inventarioId", async (req, res) => {
  try {
    let inventario = await Inventario.findById(req.params.inventarioId);

    if (!inventario) {
      return res.status(400).send("Inventario no existe");
    }

    res.send(inventario);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send(`ocurrio un error ${error}`);
  }
});

module.exports = router;
