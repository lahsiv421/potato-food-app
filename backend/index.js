const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
const cors = require('cors')
const router = require('./routes/CreateUser')
const displayDataRouter = require("./routes/DisplayData")

mongoDB();
app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept",
        
    );
    next();
});

app.use(express.json())
app.use(cors());
app.use('/api',require("./routes/CreateUser"));
app.use('/api',require("./routes/DisplayData"));
app.use('/api',require("./routes/OrderData"));
app.use('/api', displayDataRouter);
app.listen(port,()=>{
    console.log(`Example app listening on port ${port}`)
})
app.get('/',(req,res)=>{
    res.send('hello world')
}) 
