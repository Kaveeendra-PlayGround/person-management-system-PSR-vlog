import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.listen(PORT, ()=> {
    console.log(`App is listening to port : ${PORT}`);
});

app.get('/', (request, response)=> {
    console.log(request);
    response.status(200).send('Welcome Dear !!');
});

app.post('/books' , async(request, response)=> {
    try{
        if(!request.body.title || !request.body.author || !request.body.publishYear){
            return response.status(400).send(" Enter All Required fileds , title, auther, publishYear");
        }
        const newbook = {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear
        };

        const book = await Book.create(newbook);

        return response.status(201).send("Book created successfully");

    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);

    }
});

//Route for get All books fromm database

app.get('/books', async(request, response)=> {

    try{
        const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
    });

    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }

});


mongoose.connect(mongoDBURL)
.then(()=> {
    console.log('App connected to the database');
})
.catch((error)=>{
    console.log(error);
});

