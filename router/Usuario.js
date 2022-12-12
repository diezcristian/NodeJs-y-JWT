const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");
const { validarJWT } = require("../middlewares/validar-jwt");

//crear usuarios nuevos
router.post("/", async (req, res) => {
  try {
    const isUser = await Usuario.findOne({ email: req.body.email });

    if (isUser) {
      return res.send(`El correo ${req.body.email} ya esta registrado`);
    }

    let usuario = new Usuario();
    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.role = req.body.role;
    usuario.estado = req.body.estado;
    usuario.fechaCreacion = new Date();
    usuario.fechaActualizacion = new Date();
    //encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(req.body.password, salt);

    usuario = await usuario.save();
    //generar el token una vez creado el usuario,
    //para que quede autenticado una vez se crea el usuario

    const token = await generarJWT(usuario.id, usuario.nombre);

    res.status(201).json({
      ok: true,
      id: usuario.id,
      name: usuario.nombre,
      token,
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send("ocurrio un error");
  }
});

//autenticar el usuario
router.post("/auth", async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ email: req.body.email });

    if (!usuario) {
      return res.send(`El usuario no existe con este email: ${req.body.email}`);
    }

    //confirmar las contraseñas
    const validPassword = bcrypt.compareSync(
      req.body.password,
      usuario.password
    );

    if (!validPassword) {
      res.status(400).send("Password Incorrecto");
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id, usuario.nombre);

    res.json({
      ok: true,
      id: usuario.id,
      name: usuario.nombre,
      token,
    });
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send("ocurrio un error");
  }
});

//revalidar el toeken para comprovar que este logeado
//enviamos una funcion para validar si el token es correcto como un middleware
router.get("/renew", validarJWT, async (req, res) => {
  //Generar el nuevo token
  const token = await generarJWT(req.uid, req.name);

  try {
    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

//obtener todos los usarios
router.get("/", async (req, res) => {
  try {
    const users = await Usuario.find();
    res.send(users);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.put("/:usuarioId", async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.send(`El Usuario no existe`);
    }

    const isEmail = await Usuario.findOne({
      email: req.body.email,
      _id: { $ne: usuario._id },
    });

    if (isEmail) {
      return res.send(`El email ya existe`);
    }

    usuario.nombre = req.body.nombre;
    usuario.email = req.body.email;
    usuario.estado = req.body.estado;
    usuario.fechaActualizacion = new Date();

    usuario = await usuario.save();

    res.send(usuario);
  } catch (error) {
    console.log("error-->", error);
    res.send("ocurrio un error");
  }
});

router.get("/:usuarioId", async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.params.usuarioId);

    if (!usuario) {
      return res.status(400).send("Usuario no existe");
    }

    res.send(usuario);
  } catch (error) {
    console.log("error-->", error);
    res.status(500).send(`ocurrio un error ${error}`);
  }
});

module.exports = router;
