import {Router} from 'express'
import {registersGet,registersPost} from '../controllers/userControllers.js'
import {validateRegister} from '../middlewares/userMiddleware.js'

const registerRouter=Router()

registerRouter.get('/registers',validateRegister,registersGet)
registerRouter.post('/registers',validateRegister,registersPost)

export default registerRouter