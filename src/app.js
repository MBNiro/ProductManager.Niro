import express from 'express' ;
import ProductManager from './ProductManager'; 

const app = express();
const manager = new ProductManager();

app.get('/products', async (req, res) =>{
    let limit = req.query.limit;
    const products = await manager.getProducts();
    if(!limit){
        return res.json(products);
    }
    limit = limit<products.length ? limit : products.length;
    const arr = [];
    for(let i=0; i<limit; i++){
        arr.push(products[i]);
    }
    return res.json(arr);
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const prod = await manager.getProductById(id); 
    return res.json(prod);
})

app.get('/add', async (req, res) =>{
    const body = req.query; 
    const prod = await manager.addProduct(body);
    return res.json(prod);
})

app.listen(8080);