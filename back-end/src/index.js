import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';

const app = express();

app.listen(PORT, ()=> {
    console.log(`App is listening to port : ${PORT}`);
});

app.get('/', (request, response)=> {
    response.status(200).send('Welcome Dear !!');
});

mongoose.connect(mongoDBURL)
.then(()=> {
    console.log('App connected to the database');
})
.catch((error)=>{
    console.log(error);
});

