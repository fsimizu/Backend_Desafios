import express from "express";
export const viewsRouter = express.Router();
import { products } from "../utils.js"


viewsRouter.get('/', (req, res) => {
    return res.status(201).render('home', { products });
    });
