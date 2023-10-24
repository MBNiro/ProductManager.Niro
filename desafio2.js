import fs from 'fs'

class ProductManager {
    constructor() {
        this.path = './products.json';
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
        const count = list.length;
        return count > 0 ? list[count - 1].id + 1 : 1;
    }

    async addProduct(title, description, price, code, stock) {
        const list = await this.read();
        const newID = this.getNewID(list);
        const exists = this.existProduct(code, list);

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
            return 'Producto existente';
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

const productManager = new ProductManager();
const product1 = {
    id: 1,
    title: 'Caffe',
    description: 'Importado',
    price: 2000,
    code: 6789,
    stock: 30,
};

const product2 = {
    id: 2,
    title: 'Azucar',
    description: 'Calidad alta',
    price: 800,
    code: 6790,
    stock: 23,
};

const test = async () => {
    console.log('Primer consulta', await productManager.getProducts());
    await productManager.addProduct(product1);
    console.log('Segunda consulta', await productManager.getProducts());
    await productManager.addProduct(product2);
};

test();
