'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const PROTECTED_ATTRIBUTES = ['password']
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    toJSON () {
      // hide protected fields
      let attributes = Object.assign({}, this.get())
      for (let a of PROTECTED_ATTRIBUTES) {
        delete attributes[a]
      }
      return attributes
    }
  }
  user.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSaltSync(10, 'a');
        user.password = await bcrypt.hashSync(user.password, salt);
      },
    },
  });
  return user;
};