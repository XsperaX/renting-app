// index.js dentro de /app/models
// Aquí configuro Sequelize, conecto a la BD
// y registro todos los modelos y sus relaciones.

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

// Crear conexión con MySQL
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importo los modelos
db.coches = require("./coche.model.js")(sequelize, Sequelize);
db.clientes = require("./cliente.model.js")(sequelize, Sequelize);
db.alquileres = require("./alquiler.model.js")(sequelize, Sequelize);

// Modelo de usuarios para la autenticación  
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);


// RELACIONES que hice.------------------------------------

// Un cliente tiene muchos alquileres
db.clientes.hasMany(db.alquileres, {
    foreignKey: "clienteId"
});

// Un coche tiene muchos alquileres
db.coches.hasMany(db.alquileres, {
    foreignKey: "cocheId"
});

// Un alquiler pertenece a un cliente
db.alquileres.belongsTo(db.clientes, {
    foreignKey: "clienteId"
});

// Un alquiler pertenece a un coche
db.alquileres.belongsTo(db.coches, {
    foreignKey: "cocheId"
});

// Aqui exporto la BD con todos los modelos y relaciones
module.exports = db;
