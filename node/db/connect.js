const mongoose = require('mongoose')
const connectionString = `${process.env.CONNECTION}`
mongoose.connect(connectionString)