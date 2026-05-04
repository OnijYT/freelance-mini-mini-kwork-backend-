import sequelize from "../db.js";
import { DataTypes, Model, Optional } from "sequelize";

export interface Useratributs {
    id: number
    email: string
    password: string
    fullname: string
    role: 'client' | 'freelancer'
}

interface UserCreateAtributs extends Optional<Useratributs, 'id'> {}

export class User extends Model<Useratributs, UserCreateAtributs> implements Useratributs {
    declare id: number
    declare email: string
    declare password: string;
    declare fullname: string;
    declare role: 'client' | 'freelancer'
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('client', 'freelancer'),
        allowNull: false,
        defaultValue: 'client'
    },
}, {
    sequelize, 
    tableName: 'users'
})