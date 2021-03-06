const express = require("express");

const index = require("./router/index");
const routes = require("./router/gamesRoutes");

const swaggerUi = require("swagger-ui-express")
const swaggerFile = require("../swagger/swagger_output.json")

const db = require("./config/dbConnect");

db.on("error", console.log.bind(console, "Erro de Conexão."));
db.once("open", () => {
  console.log("Conexão com o banco de dados feita com sucesso");
});

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", index);
app.use("/games", routes);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
