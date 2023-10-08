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

const api=require("./routes/movieRoute");
app.use(express.static(path.join("__dirname","./frontend/build")));
app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
        res.status(500).send(err);
    })
})
app.use("/api",api);

// const loginRouter = require("./routes/loginRoute");
// app.use("/api",loginRouter)

const userRouter = require("./routes/userRoute");
app.use("/api",userRouter);

const bookingRouter = require("./routes/bookingRoutes");
app.use("/api",bookingRouter);



const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server listening on ${PORT}`);
});

