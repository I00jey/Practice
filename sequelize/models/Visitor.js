// Visitor 모델 정의
// = 테이블 구조를 정의한다
// 시퀄라이즈 모델이랑 mysql 테이블 연결
const Visitor = (sequelize, DataTypes) => {
    // sequelize: models/index.js에서의 sequelize
    // DataTypes: models/index.js에서의 Sequelize
    const model = sequelize.define(
        // 1. 모델 이름 설정
        "visitor",
        // 2. 칼럼 정의
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            comment: {
                type: DataTypes.TEXT("medium")
            }
        },
        // 3. 옵션 정의
        {
            // 실제 DB 테이블 이름 명시
            tableName: "visitor",
            // 첫번째 인자로 넘겨준 모델 이름을 그대로 테이블 이름으로 고정
            // 기본적으로 테이블 이름을 '모델명s"로 설정
            freezeTableName: true,
            // 데이터가 추가되고 수정된 시간을 자동으로 칼럼으로 만들어서 기록
            timestamps: false
        }
    );
    return model;
};

module.exports = Visitor;
