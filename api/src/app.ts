import express from "express"
const cors = require("cors");

const customerRouter = require("./routes/customers.ts")
const productsRouter = require("./routes/products.ts")

const app = express()

var corsOptions = {
    origin: ["http://localhost:5173"]
};

app.use(cors(corsOptions));

app.use(express.json())

app.use('/customers', customerRouter)
app.use('/products', productsRouter)


const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});