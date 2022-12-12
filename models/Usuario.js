const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: false,
    enum: ["Admin", "Profesor"],
  },
  estado: {
    type: String,
    required: false,
    enum: ["Activo", "Inactivo"],
  },
  fechaCreacion: {
    type: Date,
    required: false,
  },
  fechaActualizacion: {
    type: Date,
    required: false,
  },
});

module.exports = model("Usuario", UsuarioSchema);
