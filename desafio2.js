const fs = require('fs');

class ProductManager {
    constructor(){
        this.path = './products.json'
    } 

    async getProducts(){
        try {
            if(fs.existsSync(this.path)) {
               const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
               return JSON.parse(productsJSON);
            } else return [];
        } catch (error) {
            console.log(error);
        }
    };

    async addProduct(product){
        try {
            const products = await this.getProducts();
            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));
        } catch (error) {
            console.log(error);
        }
    };
};

const productManager = new ProductManager();
const product1 = {
    id:1,
    title: 'Caffe',
    description: 'Importado',
    price:2000,
    code:6789,
    stock:30,
    paquets: []
};

const product2 = {
    id:2,
    title: 'Azucar',
    description: 'Calidad alta',
    price:800,
    code:6790,
    stock:23,
    paquets: []
};

const test = async() =>{
    console.log('primer consulta', await productManager.getProducts());
    await productManager.addProduct(product1);
    console.log('segunda consulta', await productManager.getProducts());
    await productManager.addProduct(product2);
};

test();