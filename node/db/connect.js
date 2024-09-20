const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectionString = 'mongodb+srv://gupigill12:IglPTj4nBXqfdovm@cluster0.hfazu.mongodb.net/productsDatabase?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(connectionString)