import {connect} from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();


const connectionString = `${process.env.CONNECTION}`
const connectDB = async () => {
    try {
        await connect(connectionString)
        console.log('Connected to DB')
    } catch (error) {
        console.log('Failed to connect to DB', error)
    }
}

export default connectDB