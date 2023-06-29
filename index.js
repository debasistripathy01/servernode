const express = require('express')
const app = express();
const port = process.env.mongoURL;
const { connection } = require('./db');


app.use(express.json())

app.get('/', (req, res)=>{
    console.log("SUCCESS")
    res.send("HOMEPAGE");
})


const { userControll }  = require("./controller/user.router")


app.use('/user',userControll);


// Products Page CRUD oprations 

app.use('/products', productsControll);


app.listen(3001,async()=>{
    try{
        await connection;
        console.log(`Connected to DB ${connection}`)
    }catch(err){
        console.log(err)
    }
})