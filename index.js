import express from "express";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
import { productsRouter } from "./routes/products.js";
import { cartRouter } from "./routes/cart.js";
import { userRouter } from "./routes/users.js";
import cors from "cors";

dotenv.config();
const app = express()
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("MongoDB is connected");
    return client;
}

export const client = await createConnection();
app.use(express.json());
app.use(cors());
  
app.get('/', function (request, response) {
  response.send('Equipment Rental Portal')
});

app.use("/products", productsRouter);
app.use("/cart", cartRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {console.log("Server connected on port", PORT)});


