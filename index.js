const express = require("express");
const serverless = require("serverless-http");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

let products = [
    {id: 1, name:"Laptop", price: 1500},
    {id: 2, name:"Cellphone", price: 500},
    {id: 3, name:"Mouse", price: 100}
]

app.get("/api", (req, res) => {
    res.send("API is working! Try /api/products or /api/products/:id");
});

// Rutas de productos
app.get("/api/products", (req, res) => {
    res.json(products);
});

app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ error: "Product not found with the given ID" });
    }
});

app.post("/api/products", (req, res) => {
    const { id, name, price } = req.body;
    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: "ID already in use" });
    }
    const newProduct = { id, name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

module.exports = app;
module.exports.handler = serverless(app);

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});
