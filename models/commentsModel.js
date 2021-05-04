module.exports = (sequelize, DataTypes) => {
    const comments = sequelize.define("Comments", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE, 
    })
    return comments;
};
