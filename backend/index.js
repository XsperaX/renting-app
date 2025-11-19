const express = require("express");
const app = express();
const PORT = 8080;

//habilitar CORS para permitir peticiones desde Ionic
const cors = require("cors");
app.use(cors());

// Middleware para permitir JSON
app.use(express.json());

// Hacer pública la carpeta /uploads para poder acceder desde Ionic
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// use esta en un primer momento pero tenia fallos app.use('/uploads', express.static('uploads'));

//  conexión a BD
const db = require("./app/models");

// Sincronizar Sequelize con MySQL
db.sequelize.sync()
  .then(() => {
    console.log("Conexión a MySQL realizada correctamente");
  })
  .catch(err => {
    console.log("Error al conectar a MySQL:", err);
  });

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API de Renting funcionando correctamente!");
});

//ruta coche.
require("./app/routes/coche.routes")(app);

//ruta cliente
require("./app/routes/cliente.routes")(app);

//ruta alquileres
require("./app/routes/alquiler.routes")(app);

// ==============================
// RUTA DE USUARIOS (LOGIN / ADMIN)  PAra Hacer La ultima parte la ut5.
// ==============================
require("./app/routes/usuario.routes")(app);
// En este archivo están: crear admin + login


// Iniciar servidor
app.listen(PORT, () => {
  console.log("Servidor ejecutándose en http://localhost:" + PORT);
});

//“Este archivo es el servidor principal.
//  Importa Express, configura JSON, conecta con MySQL mediante Sequelize,
//  crea un endpoint de prueba y arranca el servidor en el puerto 8080.”
