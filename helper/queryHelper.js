import { ObjectId } from "mongodb";
import { client } from "../index.js";
import bcrypt from "bcrypt";

// ---------------------PRODUCTS--------------------------
export async function postAddProduct(data) {
    return await client.db("equipmentdb").collection("products").insertOne(data);
};
export async function getProducts(request) {
    return await client.db("equipmentdb").collection("products").find(request.query).toArray();
};
export async function deleteProduct(_id) {
    const oid = ObjectId(_id);
    return await client.db("equipmentdb").collection("products").deleteOne({ _id: oid });
};
export async function putUpdateProduct(_id, updateProduct) {
    const oid = ObjectId(_id);
    return await client.db("equipmentdb").collection("products").updateOne({ _id: oid }, {$set: updateProduct});
};
export async function getProduct(_id) {
    const oid = ObjectId(_id);
    return await client.db("equipmentdb").collection("products").findOne({ _id: oid });
};

//----------------------CART------------------------
export async function getCart() {
    return await client.db("equipmentdb").collection("cart").find().toArray();
};
export async function postAddToCart(data) {
    data["createdAt"] = new Date();
    return await client.db("equipmentdb").collection("cart").insertOne(data);
};
export async function deleteCart(_id) {
    const oid = ObjectId(_id);
    return await client.db("equipmentdb").collection("cart").deleteOne({ _id: oid });
};
export async function putUpdateCart(_id, updateProduct) {
    const oid = ObjectId(_id);
    return await client.db("equipmentdb").collection("cart").updateOne({ _id: oid }, {$set: updateProduct});
};


//---------------------USER------------------------
export async function genPassword(pw){
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(pw, salt);
    return hashedPw;
};
export async function postUser(user){
    return client.db("equipmentdb").collection("users").insertOne(user);
}
export async function getUsers(uname) {
    return await client.db("equipmentdb").collection("users").findOne({username: uname});
}
