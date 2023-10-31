import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

class ProductManager {
    constructor() {
        this.path = './products.json';
        this.format = 'utf-8';
    }

    async read() {
        if (fs.existsSync(this.path)) {
            const productsJSON = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(productsJSON);
        }
        return [];
    }

    async write(list) {
        await fs.promises.writeFile(this.path, JSON.stringify(list), 'utf-8');
    }

    getNewID(list) {
        return uuidv4();
    }

    async addProduct(title, description, price, code, stock) {
        const list = await this.getProducts();
        const newID = this.getNewID(list);
        const exists = list.some(el => el.code == code);
    
        if (!exists) {
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
        } else {
            return { error: `code: ${code} already exists` };
        }
    }
    
    existProduct(code, list) {
        return list.some((el) => el.code === code);
    }

    async getProducts() {
        const list = await this.read();
        return list;
    }

    async getProductById(id) {
        const list = await this.getProducts();
        const product = list.find((prod) => prod.id == id);
        return product || "El Producto no existe";
    }

    async updateProduct(id, campo, update) {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);

        if (idx < 0) return "El Producto no existe";
        list[idx][campo] = update;
        await this.write(list);
        return list[idx][campo];
    }

    async updateProductObj(id, obj) {
        obj.id = id;
        const list = await this.read();
        const idx = list.findIndex((e) => e.id == id);

        if (idx < 0) return;
        list[idx] = obj;
        await this.write(list);
    }

    async deleteProduct(id) {
        const list = await this.getProducts();
        const idx = list.findIndex((e) => e.id == id);

        if (idx < 0) return;
        list.splice(idx, 1);
        await this.write(list);
        return list;
    }
}

module.exports = ProductManager;