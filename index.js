const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secretKey = "secretkey";

app.get('/',(req,resp)=>{
    resp.json({
        name:"Harshit"
    })
})

app.post('/login',(req,resp)=>{

    const user ={
        id:1,
        name:"Mahi",
        jersey:7
    }

    jwt.sign({user},secretKey,{expiresIn: '300s'},(err,token)=>{
        resp.json(token)
        
    })
})

app.listen(4500);