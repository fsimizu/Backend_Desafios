import express from "express";
export const realTimeRouter = express.Router();
import { products } from "../utils.js"


realTimeRouter.get('/', (req, res) => {
    return res.status(201).render('realTimeProducts', { products });
    });


realTimeRouter.post('/', (req, res) => {
    const newProd = {};
    newProd.name = req.body.name;
    products.push(newProd);

    return res.status(201).render('realTimeProducts', { products });
    });