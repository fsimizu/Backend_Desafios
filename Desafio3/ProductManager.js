const fs = require("fs");

class ProductManager {
    constructor(path) {
        this.path = path
        const productsString = fs.readFileSync(this.path,"utf-8"); 
        this.products = JSON.parse(productsString);
    }
    addProduct (title, description, price, thumbnail, code, stock){
        let maxId = 0;
        let existing = false;

        this.products.forEach((item) =>{            
            
            if (item.id > maxId) {
                maxId = item.id;
            }
    
            if (item.code === code) {
                existing = true
            }
            else {
                existing = false;
            }
        });
        maxId++;
        
        if(!existing) {
            let newProduct = {
                id: maxId,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                code: code,
                stock: stock            
            }
            this.products.push(newProduct);
            
            const productsString = JSON.stringify(this.products);
            fs.writeFileSync(this.path, productsString ); 
            
            console.log("The product has been added")
        }   else console.log("A product with the same ID already exists")
        
    }
    getProducts(){
        console.log(this.products)
    }

    deleteProductById(code){
        let searchedProductIndex = this.products.findIndex((item)=>item.code === code);
                    
        if (searchedProductIndex != -1) {
                this.products.splice(searchedProductIndex,1);
                const productsString = JSON.stringify(this.products);
                fs.writeFileSync(this.path, productsString ); 
                console.log("The product has been deleted");
            }
            else (console.log("Not found, not deleted"))
    }

    getProductById(code){
        let searchedProduct = this.products.find((item)=>item.code === code)
        if (searchedProduct) {
            console.log(searchedProduct)
            }
            else (console.log("Not found"))
    }

    updateProduct(code, title, description, price, thumbnail, stock) {
        let searchedProductIndex = this.products.findIndex((item)=>item.code === code);
        
        if (searchedProductIndex != -1) {
            
            this.products[searchedProductIndex] = {
                code: code,
                title: title,
                description: description,
                price: price,
                thumbnail: thumbnail,
                stock: stock            
            }

            const productsString = JSON.stringify(this.products);
            fs.writeFileSync(this.path, productsString ); 
            console.log("The product has been updated");
        } else {console.log("The code does not belong to an existing product");}
    }

}

//module.exports = ProductManager;

const pizzas = new ProductManager("products.json");

// pizzas.getProducts();
// pizzas.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
// pizzas.getProducts();
// pizzas.getProductById("abc123");
// pizzas.updateProduct("abc123", "TAAtitle", "description", 100, "thumbnail", 10);
// pizzas.deleteProductById("abc123");
