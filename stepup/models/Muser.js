const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define("user", {
        id: {
            type: DataTypes.STRING(20),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        userid
    });
};
