const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create the Comment model
class Comment extends Model {};

Comment.init (
     // requires two objects as arguments
    {
        // Comment TABLE column definitions
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: DataTypes.TEXT,
            validate: {
                // comment must be at least 1 character
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        }
    },
    {
        // TABLE CONFIGURATION OPTIONS
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;