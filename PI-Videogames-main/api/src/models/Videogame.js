const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, //¿Por qué default?
      alowwNull: false,
      primaryKey: true //Que es primaryKey
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
    },
    released:{
      type: DataTypes.STRING
    },
    rating:{
      type: DataTypes.FLOAT
    },
    platforms: {
      type: DataTypes.STRING,
      allowNull: false,
   },
    img: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createDB: {  //sirve para distinguir entre videojuegos de la api y bd
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }
  },{timestamps: false});
};
