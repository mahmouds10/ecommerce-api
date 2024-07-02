import { Router } from "express";
import * as ordersController from './orders.controller.js'
const ordersRouter =  Router();

ordersRouter.post('/addOrder', ordersController.addOrder)
ordersRouter.get('/averageValeu', ordersController.getAverageOrder)


export default ordersRouter