const { sequelize } = require("../sequelize.js");
const { DataTypes,Sequelize } = require("sequelize");
const {userRole}  = require("./userRole.js")
const {modules}  = require("./modules.js")

const rolePermissions = sequelize.define('role_permissions', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: userRole,
        //     key: "id",
        //   },
    },
    module_id: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: modules,
        //     key: "id",
        //   },
    },
    module_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // references: {
        //     model: modules,
        //     key: "id",
        //   },
    },
    create_p: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    read_p: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    update_p: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    delete_p: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});

// rolePermissions.belongsTo(userRole, { foreignKey: "id" });
// rolePermissions.belongsTo(modules, { foreignKey: "id" });

module.exports = {
    rolePermissions
};
