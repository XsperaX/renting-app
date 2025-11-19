module.exports = (sequelize, Sequelize) => {
  const Coche = sequelize.define(
    "coche",
    {
      marca: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },
       matricula: { //después de lo que me habías dicho en la primera entrega añadí matricula.
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
       },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      precio_dia: {
        type: Sequelize.DECIMAL(10, 2)
      },

      foto: { //añadido para la ut3 para el tema de poner una foto
         type: Sequelize.STRING,
         allowNull: true
      },

      disponible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    },
    {
      timestamps: false  // Desactiva createdAt y updatedAt me daba errores con las tablas.
    }
  );

  return Coche;
};
//modelo de coche,de la estructura creada en mi base de datos renting,para usar sequelize
//lo usamos el año pasado para usar sequelize en vez de sql