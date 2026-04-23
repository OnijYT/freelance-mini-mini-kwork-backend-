import { DataTypes, Model, Optional } from "sequelize"
import sequelize from "../db.js"

interface JobAttributes {
    id: number
    title: string
    description: string
    price: number
    status: 'open' | 'in_progress' | 'completed'
    clientId: number
}

interface JobCreationAttributes extends Optional<JobAttributes, 'id'> {}

export class Job extends Model<JobAttributes, JobCreationAttributes> implements JobAttributes {
    declare id: number;
    declare title: string;
    declare description: string;
    declare price: number;
    declare status: 'open' | 'in_progress' | 'completed';
    declare clientId: number;
    
    declare readonly createdAt: Date
    declare readonly updatedAt: Date
}

Job.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
    },

    description: {
        type: DataTypes.TEXT
    },

    price: {
        type: DataTypes.INTEGER
    },

    status: {
        type: DataTypes.ENUM('open', 'in_progress', 'completed'),
        defaultValue: 'open'
    },

    clientId: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    tableName: 'jobs'
})