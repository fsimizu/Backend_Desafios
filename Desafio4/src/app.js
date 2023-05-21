import express from 'express';
import handlebars from "express-handlebars";
import path from "path";
import { viewsRouter } from './routes/views.router.js';
import { realTimeRouter } from './routes/realTime.router.js';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import { products } from './utils.js';
import { uid } from 'uid';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"))

//para el handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");


app.get('/', (req, res) => {
    return res.send('Hello World!');
  });

const httpServer = app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`);
});


const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log("Nuevo cliente conectado");
    
    socket.on("newProduct", obj => {
        let existing = false;
        let message;
            
        products.forEach(elem => {
            if (elem.code === obj.prod.code) {existing = true}            
        });

        switch (obj.action) {
            case "new":
                if (!existing) {
                    obj.prod.id = uid ();
                    products.push(obj.prod);
                    message = "Product added successfully"
                } 
                else {
                    message = "A product with that code already exists.";
                }
                break;
            case "edit":
                if (!existing) {
                    message = "Incorrect product code. Please try another one"
                } 
                else {
                    let prodIndex = products.findIndex((elem)=>elem.code === obj.prod.code);
                    
                    if (obj.prod.name) {products[prodIndex].name = obj.prod.name};
                    if (obj.prod.price) {products[prodIndex].price = obj.prod.price};

                    message = "Product edited successfully";
                }
                break;

            case "delete":
                if (!existing) {
                    message = "Incorrect product code. Please try another one"
                } 
                else {
                    let prodIndex = products.findIndex((elem)=>elem.code ===obj.prod.code);
                    products.splice(prodIndex,1);
                    message = "Product removed successfully";
                }
                break;
        }

        socket.emit("productsUpdated", products );
        socket.emit("result", message);
    
    })
})

app.use("/home", viewsRouter);
app.use("/realtimeproducts", realTimeRouter);

