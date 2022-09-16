import express from "express";
import { genPassword, getUsers, postUser } from "../helper/queryHelper.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", async (request, response) => {
    const {username, password, type} = request.body;
    const hashedPassword = await genPassword(password);
    const users = await getUsers(username);
    if(users){
        response.status(400).send({message: "User already exists"});
        return;
    }
    if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g.test(password)){
        response.status(400).send({message: "Password must contain atleast one Uppercase, one Lowercase, one number and one special character" });
        return;
    }
    const user = {
        username: username,
        password: hashedPassword,
        type: "user"
    }
    const result = await postUser(user);
    result.insertedId ? response.status(200).send({ message: "Signed up successfully" }) : response.status(400).send({ message: "Sign up failed!!!" });
});

router.post("/login", async (request, response) => {
    const {username, password} = request.body;
    const userFromDB = await getUsers(username);

    //user doesn't exists
    if(!userFromDB) {
        response.status(400).send({message: "Invalid credentials"});
        return;
    }
    //password not matching
    const storedPw = userFromDB.password;
    const isPwMatch = await bcrypt.compare(password, storedPw);
    if(!isPwMatch){
        response.status(400).send({message: "Invalid credentials"});
        return;
    }
    //issue token
    let token = null;
    if(userFromDB.type === "admin"){
        token = jwt.sign({id: userFromDB._id}, process.env.SECRET_KEY);
    }
    response.send({message: "Successful login", token});
});

export const userRouter = router;