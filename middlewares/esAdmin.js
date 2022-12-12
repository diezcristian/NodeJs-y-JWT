const esAdmin = async (req = request, res = response, next) => {
  console.log(req.user);
  const { role } = req.user;

  console.log("role", role);
  if (!req.user) {
    return res.status(500).json({
      msg: "Debe validar Token",
    });
  }
  if (role !== "ADMIN") {
    return res.status(403).json({
      msg: "No permitido",
    });
  }
  next();
};

module.exports = {
  esAdmin,
};
