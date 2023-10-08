const express = require('express');
const app = express();
const morgan = require('morgan');
var cors = require('cors');
const path = require('path');
const __dirname=path.resolve();

app.use(morgan('dev'));
require('dotenv').config();
require("./db/mongodb")
app.use(cors());


app.use(express.static(path.join("__dirname","./frontend/build")));

const api=require("./routes/movieRoute");
app.use("/api",api);
const userRouter = require("./routes/userRoute");
app.use("/api",userRouter);
const bookingRouter = require("./routes/bookingRoutes");
app.use("/api",bookingRouter);

app.use('*',function(req,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
        res.status(500).send(err);
    })
})

// app.get('*',function(_,res){
//     res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
//         res.status(500).send(err);
//     })
// })


const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});

