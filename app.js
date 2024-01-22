const express = require('express')
const app = express()
const connectDB =require('./db/connect')
require('dotenv').config()
const tasks = require('./routes/tasks')
const notFound = require('./middleware/not-found.js')
const errorhandler = require('./middleware/error-handler.js')

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes

app.use('/api/v1/tasks',tasks)

app.use(notFound)
app.use(errorhandler)

const port = 3000

const start =async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}
start()


