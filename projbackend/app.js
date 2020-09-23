require('dotenv').config();

const express    = require('express');
const app        = express();
const mongoose   = require('mongoose');



//DB Connection
mongoose
    .connect(process.env.DATABASE,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(()=>{
        console.log("DB CONNECTED");
    })
    .catch(err => {
        console.log(Error, err.message);
    });

    
app.get("/",(req,res)=>{
    res.send("Yo");
});


//PORT
const port = process.env.PORT || 3000; 

//Starting a server
app.listen(port, ()=>{
    console.log(`app is running at ${port}`);
});