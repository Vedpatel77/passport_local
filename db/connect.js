const mongoose = require('mongoose');
const url = "mongodb://localhost:27017/passport";

mongoose.connect(url).then(()=>{
    console.log("connection with mongodb is successful");
}).catch((e)=>{
    console.log(e);
})