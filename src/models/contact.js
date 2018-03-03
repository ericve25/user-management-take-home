const Contact = (sequelize, DataTypes) => {
  const ContactModel = sequelize.define(
    'contact',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      indexes: [
        {
          fields: ['name'],
          where: {
            deletedAt: {
              $eq: null
            }
          }
        }
      ]
    }
  );

  ContactModel.associate = models => {
    ContactModel.belongsTo(models.user);
  };

  return ContactModel;
};

module.exports = Contact;
