const express = require('express')
require('./dev/mongoose')
const routerTasks=require('./routers/tasks')

const app = express()
const port = process.env.PORT || 3000


app.use(express.json())
app.use(routerTasks)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})