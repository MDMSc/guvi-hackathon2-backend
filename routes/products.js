import { deleteProduct, getProduct, getProducts, postAddProduct, putUpdateProduct } from "../helper/queryHelper.js";
import express from "express";

const router = express.Router();

router.get('/', async (request, response) => {
    const result = await getProducts(request);
    result ? response.send(result) : response.status(404).send({ message: "No Product available" });
});

router.post('/add-product', async (request, response) => {
    const data = request.body;
    const result = await postAddProduct(data);
    result.insertedId ? response.status(200).send({ message: "Product added successfully" }) : response.status(400).send({ message: "Product not added" });
});

router.put('/update-product/:_id', async (request, response) => {
    const { _id } = request.params;
    const updateData = request.body;
    const result = await putUpdateProduct(_id, updateData);
    result.modifiedCount > 0 ? response.status(200).send({ message: "Product updated successfully" }) : response.status(400).send({ message: "Update Failed!!!" });
});

router.delete('/:_id', async (request, response) => {
    const { _id } = request.params;
    const result = await deleteProduct(_id);
    result.deletedCount > 0 ? response.status(200).send({ message: "Product deleted successfully" }) : response.status(400).send({ message: "Deletion Failed!!!" });
});
router.get('/:_id', async (request, response) => {
    const { _id } = request.params;
    const data = await getProduct(_id);
    data ? response.send(data) : response.status(404).send({ message: "Product not found" });
});

export const productsRouter = router;
