module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    sex: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    user_type: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    access_level: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      defaultValue: "0",
    },
  });

  return User;
};
