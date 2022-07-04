import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import registerRouter from './routes/registerRoutes.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()

const server=express()
server.use(cors())
server.use(json())

server.use(authRouter)
server.use(registerRouter)

server.listen(process.env.PORT)