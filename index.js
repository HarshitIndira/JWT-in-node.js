const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

const secretKey = "MySecretKey";

app.post('/login', (req,resp)=>{
    const user ={
        id:1,
        name:"Mahi"
    }   

    jwt.sign({user}, secretKey,{expiresIn:'300s'},(err,token)=>{
        resp.json(token);
    });
});

app.post('/profile',verifyToken,(req,resp)=>{
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            resp.send({
                result: "Token is invalid"
            })
        }else{
            resp.json({
                message: "Profile fetched successfully..",
                authData
            })
        }
    });
});

function verifyToken(req,resp,next){
    const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== undefined){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        resp.send({
            result: "Token is invalid....."
        })
    }
}

app.listen(5000);