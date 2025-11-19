// Modelo "Usuario"
// Añadido para la UT5  Autenticación básica con un usuario administrador
// Este modelo se usará SOLO para login (no tiene nada que ver con clientes)

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define(
        "usuario",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            // Nombre de usuario para hacer login (en nuestro caso "erico")
            nombre: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true   // No voy a permitir nombres repetidos
            },

            // Contraseña encriptada (no se guarda en texto plano)
            password: {
                type: Sequelize.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false   // No necesito createdAt / updatedAt
        }
    );

    return Usuario;   // ⬅️ IMPORTANTE: debe retornar el modelo
};
