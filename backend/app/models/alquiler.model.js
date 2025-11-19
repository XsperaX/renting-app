// Modelo "Alquiler"
// Representa los alquileres realizados por un cliente sobre un coche.

module.exports = (sequelize, Sequelize) => {
    const Alquiler = sequelize.define(
        "alquiler",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            // Fecha en la que comienza el alquiler
            fecha_inicio: {
                type: Sequelize.DATE,
                allowNull: false
            },

            // Fecha en la que termina el alquiler
            fecha_fin: {
                type: Sequelize.DATE,
                allowNull: false
            },

            // Cliente que realiza el alquiler (FK)
            clienteId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            // Coche alquilado (FK)
            cocheId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            // Precio total del alquiler (calculado en el controlador)
            precio_total: {
                type: Sequelize.FLOAT,
                allowNull: false,
                defaultValue: 0
            }
        },
        {
            timestamps: false // Para evitar problemas con createdAt/updateAt
        }
    );

    return Alquiler;
};
//Relaciones que hice para recordar
// Un cliente puede tener muchos alquileres
// Un coche puede tener muchos alquileres
// Cada alquiler pertenece exactamente a un cliente
// Cada alquiler pertenece exactamente a un coche
