import express from "express";
import e from "express";

const route = express.Router();

route.get('/clientID', (req, res)=>{
    res.json({"clientId": process.env.PAYPAL_CLIENT_ID});
})

export default route;