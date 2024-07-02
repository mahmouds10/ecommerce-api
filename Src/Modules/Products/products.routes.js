import { Router } from "express";
import * as productsController from './products.controller.js'
const productsRouter = Router()
productsRouter.post('/addProduct', productsController.addProduct)
productsRouter.get('/revenue', productsController.totalRevenueByCategory)
productsRouter.get('/sales', productsController.itemsSoldPerProduct)

export default productsRouter