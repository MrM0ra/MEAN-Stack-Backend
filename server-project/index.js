const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
//Create server
const app = express();

//Connect DB
connectDB();

app.use(cors())

app.use(express.json())

app.use('/api/product', require('./routes/product'))

app.listen(4000, ( )=> {
    console.log("Server running smoothly")
})

console.log("from index.js")