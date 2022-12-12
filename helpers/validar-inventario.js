const validarInventario = (req) => {
  const validaciones = [];

  if (!req.body.serial) {
    validaciones.push("serial es requerido");
  }

  if (!req.body.modeloEquipo) {
    validaciones.push("modelo equipo es requerido");
  }

  if (!req.body.descripcion) {
    validaciones.push("descripcion es requerido");
  }

  if (!req.body.color) {
    validaciones.push("color es requerido");
  }

  if (!req.body.foto) {
    validaciones.push("foto es requerido");
  }

  if (!req.body.fechaCompra) {
    validaciones.push("fecha de compra es requerido");
  }

  if (!req.body.precio) {
    validaciones.push("precio es requerido");
  }

  if (!req.body.usuario) {
    validaciones.push("usuario es requerido");
  }

  if (!req.body.marca) {
    validaciones.push("marca es requerido");
  }

  if (!req.body.tipoEquipo) {
    validaciones.push("tipo de equipo es requerido");
  }

  if (!req.body.EstadoEquipo) {
    validaciones.push("estado equipo es requerido");
  }

  return validaciones;
};

module.exports = {
  validarInventario,
};
