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

    getNewID = list =>{
        const count = list.length;
        return (count > 0) ? list[count - 1].id + 1 : 1;
    } 

    addProduct = async (title, description, price, code, stock) => {
        const list = await this.read();
        const newID = this.getNewID(list);
        const exis = this.existProduct(code, list);
        if (! exis < 0) {
            const newProduct = {
                id: newID,
                title,
                description,
                price,
                code,
                stock,
            };
            list.push(newProduct);
            await this.write(list);
            return newProduct;
        }
        return 'producto existente';
    }
};

const productManager = new ProductManager();
const product1 = {
    id:1,
    title: 'Caffe',
    description: 'Importado',
    price:2000,
    code:6789,
    stock:30,
};

const product2 = {
    id:2,
    title: 'Azucar',
    description: 'Calidad alta',
    price:800,
    code:6790,
    stock:23,
};

read = () => {
    if (fs.existsSync(this.path)) {
        return fs.promises.readFile(this.path, this.format).then(r => JSON.parse(r));
    }
    return [];
}

getProducts = async () => {
    const list = await this.read();
    return list;
}

write = async list => {
    fs.promises.writeFile(this.path, JSON.stringify(list));
}

existProduct = (code, list) => {
    return list.some(el => el.code === code);
}

getProductbyId = async (id) => {
    const list = await this.getProducts();
    return list.find((prod) => prod.id == id) ?? "El Producto no existe";
}

updateProduct = async (id, campo, update) => {
    const list = await this.getProducts();
    const idx = list.indexOf(e => e.id == id);
    
    if(idx < 0) return "El Producto no existe";
    list[idx][campo] = update;
    await this.write(list);
    return list[idx][campo];
}

updateProductObj = async (id, obj) => {
    obj.id = id;
    const list = await this.read();

    const idx = list.findIndex((e) => e.id == id);
    if (idx < 0) return;
    list[idx] = obj;
    await this.write(list);
}

deleteProduct = async (id) => {
    const list = await this.getProducts();
    const idx = list.findIndex((e) => e.id == id);
    if (idx < 0) return;
    list.splice(idx, 1);
    await this.write(list);
    return list;
}


const test = async() =>{
    console.log('primer consulta', await productManager.getProducts());
    await productManager.addProduct(product1);
    console.log('segunda consulta', await productManager.getProducts());
    await productManager.addProduct(product2);
};

test();