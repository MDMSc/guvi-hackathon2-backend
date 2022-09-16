import { deleteCart, getCart, postAddToCart, putUpdateCart } from "../helper/queryHelper.js";
import express from "express";

const router = express.Router();


router.get('/', async (request, response) => {
    const result = await getCart();
    result ? response.send(result) : response.status(404).send({ message: "Cart is Empty" });
});

router.post('/add-cart/:_id', async (request, response) => {
    const {_id} = request.params;
    const data = request.body;
    data.pid = _id;
    const result = await postAddToCart(data);
    result.insertedId ? response.status(200).send({ message: "Added to Cart" }) : response.status(400).send({ message: "Add to cart Failed" });
});

router.put('/update-cart/:_id', async (request, response) => {
    const { _id } = request.params;
    const updateData = request.body;
    const result = await putUpdateCart(_id, updateData);
    result.modifiedCount > 0 ? response.status(200).send({ message: "Cart updated successfully" }) : response.status(400).send({ message: "Update Failed!!!" });
});

router.delete('/:_id', async (request, response) => {
    const { _id } = request.params;
    const result = await deleteCart(_id);
    result.deletedCount > 0 ? response.status(200).send({ message: "Product deleted successfully" }) : response.status(400).send({ message: "Deletion Failed!!!" });
});


export const cartRouter = router;
