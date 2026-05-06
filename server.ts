import dotnev from 'dotenv'
import sequelize from './db.js'
import express from 'express'
import cors from 'cors'
import JobRoutes from './routes/JobRoutes.js'
import AuthRoute from './routes/AuthRoute.js'
import Checkrout from './routes/Checkrout.js'
import { Job } from './models/Jobs.js'
import { User } from './models/User.js'


dotnev.config()

const app = express()
app.use(cors())
app.use(express.json())

// app

app.use('/api/jobs', JobRoutes)
app.use('/api/auth', AuthRoute)
app.use('/me', Checkrout)


// связи

User.hasMany(Job, { foreignKey: 'clientId' });
Job.belongsTo(User, { foreignKey: 'clientId' });

// start
const start = async (): Promise<void> => {
    try {
        await sequelize.authenticate()
        await sequelize.sync({ alter: true })
        app.listen(5000, () => console.log('server ok'))
    } catch (err) {
        console.error(err)
    }
}

start()