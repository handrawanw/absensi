var mongoose = require('mongoose');

let index_model=require("./model/index_model");

const dbConnect = () => {
    // const mongoURI = process.env.MONGO_URL;
    const mongoURI="mongodb://localhost:27017/lexpress";
    mongoose.connect(mongoURI, {
        useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true, 
        // connectTimeoutMS: 15000 
    });
    let db = mongoose.connection;
    db.on('error', console.log.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log(`Welcome to MongoDb `)
        index_model();
    });
    
};

module.exports = dbConnect;