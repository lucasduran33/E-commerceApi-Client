const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const productRoute = require('./routes/product')
const paymentRoute = require('./routes/stripe')
const cors = require('cors')
dotenv.config()


app.use(express.json());  //permite leer json 

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connect successfull!'))
.catch((err) => {
    console.log(err);
});


app.use(cors())
app.use('/api/user',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/products', productRoute)
app.use('/api/carts',cartRoute)
app.use('/api/orders',orderRoute)
app.use('/api/checkout',paymentRoute)



app.listen(process.env.PORT || 5000, ()=>{
    console.log('BackendServer is runninG!')
})


app.get('/api/test', ()=>{
    console.log('test')
})