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

app.get("/", (req, res) => {
    res.send("API is working! Try /api/products or /api/products/:id");
});

app.get("/products", (req,res) => {
    res.json(products);
})

app.get("/products/:id", (req, res) => {
    try {
        const product = products.find(p => p.id === parseInt(req.params.id)); 
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Product not found with the given ID" });
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/products', (req, res) => {
    const { id, name, price } = req.body;

    if (products.some(p => p.id === id)) {
        return res.status(400).json({ error: 'ID already in use' });
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
