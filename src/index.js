import express,{json} from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {sign_up,login} from './controllers/authControllers.js'
import registerRouter from './routes/registerRoutes.js'

dotenv.config()

const server=express()
server.use(cors())
server.use(json())

server.post('/sign-up',sign_up)
server.post('/login',login)
server.use(registerRouter)

server.listen(process.env.PORT)