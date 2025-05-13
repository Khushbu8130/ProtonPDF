require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const getConnection = require('./utils/getConnection')
const userRoutes = require('./routes/user')
const app = express()
const path = require('path');
const _dirname = path.resolve();

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use('/user',userRoutes)

app.use((error,req,res,next) => {
    const message = error.message || "server error";
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({message:message});
});
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('*',(_,res) => {
    res.sendFile(path.resolve(_dirname,"Frontend","dist","index.html"));
});

getConnection();
app.listen(process.env.PORT,()=>console.log('server is running on port:'+process.env.PORT))