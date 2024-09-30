import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
const dotenv = require('dotenv').config()
const connectionString = `${process.env.CONNECTION}`
connect(connectionString)
const data = connect(connectionString).then((data)=> console.log(data))
import productRoutes from './routes/product'


const connectDB = async () => {
    try {
        await connect(connectionString)
        console.log('Connected to DB')
    } catch (error) {
        console.log('Failed to connect to DB', error)
    }
}
connectDB()
const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200
}
const app = express();
app.use(cors(corsOptions))
app.use(json())
app.use('/api/v1/products', productRoutes)


const port = 4000;

app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})

