// TODO: User 모델 정의
const User = (sequelize, DataTypes) => {
    const model = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            pw: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            name: {
                type: DataTypes.STRING(15),
                allowNull: false
            },
            userid: {
                type: DataTypes.STRING(15),
                allowNull: false
            }
        },
        {
            tableName: "user",
            freezeTableName: true,
            timestamps: false
        }
    );
    return model;
};

module.exports = User;
