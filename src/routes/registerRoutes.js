import {Router} from 'express'
import {registersGet,registersPost,registersDelete} from '../controllers/userControllers.js'
import {validateRegister} from '../middlewares/userMiddleware.js'

const registerRouter=Router()

registerRouter.get('/registers',validateRegister,registersGet)
registerRouter.post('/registers',validateRegister,registersPost)
registerRouter.delete('/registers',validateRegister,registersDelete)


export default registerRouter