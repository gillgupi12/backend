const mongoose = require('mongoose')
require('dotenv').config()

const connectionString = `${process.env.CONNECTION}`
mongoose.connect(connectionString)