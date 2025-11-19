// Modelo "Cliente"
// Representa la tabla "clientes" en MySQL usando Sequelize.

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define(
        "cliente",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },
            apellido: {
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true  // Solo voy a permitir un email por usuario.
            },
            telefono: {
                type: Sequelize.STRING,
                allowNull: false
            },
            dni: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true  //Los pongo unicos por coherencia
            }
        },
        {
            timestamps: false   // Tenía errores si no tenía esto.
        }
    );

    return Cliente;
};
