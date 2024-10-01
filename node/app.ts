import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import brandRoutes from './routes/brand'
import authRoutes from './routes/auth'
import productRoutes from './routes/product'
import userRoutes from './routes/user'
import connectDB from './db/connect'

//Cors options
const corsOptions = {
    origin: '',
    optionsSuccessStatus: 200
}
//Create Expres app
const app = express();

//Middleware
app.use(cors(corsOptions))
app.use(json())

//Routes
app.use('/api/v1/', authRoutes)
app.use('/api/v1/product', productRoutes)
app.use('/api/v1/brand', brandRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/order', userRoutes)

//Set the ports
const port = process.env.PORT || 4000;


//Start server and connect to Databaes 
app.listen(port, async () => {
    await connectDB()
    console.log(`Server running on ${port}`)
})

