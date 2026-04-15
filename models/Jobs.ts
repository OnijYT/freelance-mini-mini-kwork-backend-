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
    public id!: number;
    public title!: string;
    public description!: string;
    public price!: number;
    public status!: 'open' | 'in_progress' | 'completed';
    public clientId!: number;

    public readonly createdAt!: Date
    public readonly updatedAt!: Date
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