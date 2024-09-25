const express = require('express');
require('../node/db/connect')
const productRoutes = require('./routes/product')
const brandRoutes = require('./routes/brand')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

const app = express();
app.use(express.json())
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/brands', brandRoutes)
app.use('/api/v1/',  authRoutes)
app.use('/api/v1/users',  userRoutes)

const port = 4000;

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})

