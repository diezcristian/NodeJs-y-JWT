const xpress = require("express");
const { getConnection } = require("./db/db-connection-mongo");
const cors = require("cors");
require("dotenv").config();

const app = xpress();
const port = process.env.PORT || 9000;

//implementation cors
app.use(cors());

getConnection();

//implementation json
app.use(xpress.json());

app.use("/usuario", require("./router/Usuario"));
app.use("/estado-equipo", require("./router/estadoEquipo"));
app.use("/marca", require("./router/marca"));
app.use("/tipo-equipo", require("./router/tipoEquipo"));
app.use("/inventario", require("./router/inventario"));

app.listen(port, () => console.log(`server runing... on port: ${port}`));
