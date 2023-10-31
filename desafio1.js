import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, code, stock) {
        const product = {
            id: uuidv4(),
            title,
            description,
            price,
            code,
            stock,
            paquets: []
        };
        this.products.push(product);
    }

    #getId(){
        let maxId = 0;
        this.products.map((product)=>{
            if(product.id > maxId) maxId = product.id;
        })
        return maxId;
    };

    getProducts(){
        return this.products;
    }

    getProduct(idProduct){
        return this.products.find((product) => product.id === idProduct);
    }

    getProductById(idProduct){
        const product = this.getProduct(idProduct);
        if(product) {
            if(!product.paquets.includes(idProduct)) product.paquets.push(idProduct);
        } else return 'Not found'
    }

    addCode(idProduct, idCode){
        const product = this.getProduct(idProduct);
        if(product) {
            if(!product.paquets.includes(idCode)) product.paquets.push(idCode);
        } else return 'this code not exists'
    }

    productNew(idProduct, newTitle, newDescription,newPrice, newCode, newStock){
        const product = this.getProduct(idProduct);
        if(product){
            const newProduct = {
                ...product,
                id: uuidv4(),
                title: newTitle,
                description: newDescription,
                price: newPrice,
                code: newCode,
                stock: newStock,
                products: []
            };
            this.products.push(newProduct);
        } else return 'this product not exists'
    };
};  

const productManager = new ProductManager();

productManager.addProduct('Cafe', 'Cafe negro importado de Colombia', 2500, 1243, 68 );
productManager.productNew('Pan', 'Pan integral casero', 1700, 1244, 70)
console.log(productManager.getProducts());