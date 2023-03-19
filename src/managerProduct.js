import fs from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        const products = await this.getProducts();

        if (products.some((p) => p.code === product.code)) {
            console.log('Error: El código del producto ya existe');
            return -1;
        }
        const lastProduct = products[products.length - 1];
        const newId = lastProduct ? lastProduct.id + 1 : 1;

        console.log("AGREGADO DE PRODUCTOS");

        if (!product.title || !product.description || !product.price || !product.thumbnails || !product.code || !product.stock || !product.category) {
            console.log("Error! Todos los campos son obligatorios");
            return;
        }

        const newProduct = {
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnails: product.thumbnails || [],
            code: product.code,
            stock: product.stock,
            category: product.category,
            status: true,
            id: newId,
            ...product
        }
        products.push(newProduct);
        await this.#saveProducts(products);
        return newProduct;
    }

    async getProducts() {
        try {
            const products = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(products);
        }
        catch (err) {
            if (err.code === "error") {
                await this.#saveProducts([]);
                return [];
            }
            return err;
        }
    }

    async getProductById(id) {
        const products = await this.getProducts();
        const productoBuscado = products.find((x) => x.id == id);
        if (productoBuscado) {
            console.log("BUSQUEDA DE PRODUCTOS");
            console.log("El producto con id ", id, " fue encontrado:")
            return productoBuscado;
        } else {
            console.log("BUSQUEDA DE PRODUCTOS");
            console.log("id", id, "not found")
            return null;
        }
    }

    async #saveProducts(products) {
        await fs.promises.writeFile(this.path, JSON.stringify(products));
    }

    async deleteProductById(id) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return 'El producto no existe';
        } else {
            products.splice(index, 1);
            await this.#saveProducts(products);
            return 'Producto'
        };
    }

    async updateProductById(id, update) {
        const products = await this.getProducts();
        const index = products.findIndex((product) => product.id === id);
        if (index === -1) {
            return 'Producto para actualizar no encontrado';
        }
        const updatedProduct = {
            title: update.title || products[index].title,
            description: update.description || products[index].description,
            price: update.price || products[index].price,
            thumbnails: update.thumbnails || products[index].thumbnails,
            code: update.code || products[index].code,
            stock: update.stock || products[index].stock,
            category: update.category || products[index].category,
            status: update.status || products[index].status,
            id: id
        };
        products.splice(index, 1, updatedProduct);
        await this.#saveProducts(products);
        return updatedProduct;
    }
}
