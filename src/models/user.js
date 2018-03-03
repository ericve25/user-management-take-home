const User = (sequelize, DataTypes) => {
  const UserModel = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      indexes: [
        {
          fields: ['email'],
          where: {
            deletedAt: {
              $eq: null
            }
          },
          unique: true
        }
      ]
    }
  );

  UserModel.associate = models => {
    UserModel.hasMany(models.contact);
  };

  return UserModel;
};

module.exports = User;
