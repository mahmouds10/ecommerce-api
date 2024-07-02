import { Router } from "express";
import * as customerController from "./customers.controller.js"
const customerRouter = Router()
customerRouter.post('/signup' , customerController.sugnUp)
customerRouter.post('/login' , customerController.login)
customerRouter.delete('/removeCustomer' , customerController.removeCustomer)
customerRouter.get('/noOrders', customerController.getCustomersWithoutOrder)
customerRouter.get('/mostItems', customerController.mostItemsPurchased)
customerRouter.get('/mostspend/:limit?', customerController.mostSpending)
customerRouter.get('/minOrders/:limit?', customerController.minimumOrders)
customerRouter.get('/multiOrderPercentage', customerController.multiOrderPercentage)
customerRouter.get('/earliestOrder', customerController.earliestOrder)

export default customerRouter