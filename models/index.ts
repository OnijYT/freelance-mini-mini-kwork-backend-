import { User } from "./User.js"
import { Job } from "./Jobs.js"

export const initializeAssociations = () => {
    User.hasMany(Job, { foreignKey: 'clientId' })
    Job.belongsTo(User, { foreignKey: 'clientId' })
}
