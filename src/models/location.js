/* eslint-disable func-names */
/* eslint-disable no-magic-numbers */
export default function (sequelize, DataTypes) {
  return sequelize.define('location', {
    locationPrimaryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id',
    },
    location: {
      type: DataTypes.STRING(60),
      allowNull: false,
      field: 'name',
    }
  },
  {
    tableName: 'location',
    timestamps: false,
    underscored: true,
  });
}
