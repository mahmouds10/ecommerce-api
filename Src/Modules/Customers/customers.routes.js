import { Router } from "express";
import * as customerController from "./customers.controller.js"
const customerRouter = Router()
customerRouter.post('/signup' , customerController.sugnUp)
customerRouter.post('/login' , customerController.login)
customerRouter.delete('/removeCustomer' , customerController.removeCustomer)

export default customerRouter