//const appi = require('./app')
const express = require('express')
require('./dev/mongoose')
const port = process.env.PORT
const routerUsers = require('./routers/users')
const routerTasks = require('./routers/tasks')

const app = express()

app.use(express.json())
app.use(routerUsers)
app.use(routerTasks)
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})