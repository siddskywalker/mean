const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

//middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors())

const api = process.env.API_URL;
const mongo_conn_string= process.env.mongodb;

//Routes
const productsRoutes = require('./routes/products');

//api
app.use(`${api}/products`, productsRoutes);

//database
mongoose.connect(mongo_conn_string,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
});

//Server
app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})