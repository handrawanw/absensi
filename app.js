const express=require("express");
const app=express();

require("dotenv").config();
require("./dbConnect")();

const PORT=process.env.PORT||2022;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const router=require("./router/index");
const errHandler=require("./middleware/errHandler");
app.use("/api/v1",router);
app.use(errHandler);

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Server is running ${PORT}`)
})