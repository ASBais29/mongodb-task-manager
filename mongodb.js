const mongodb=require('mongodb')
const MongoClient=mongodb.MongoClient

const connecturl='mongodb://127.0.0.1:27017'
const databaseName='task-manager'
 MongoClient.connect(connecturl,{useNewUrlParser: true},(error,client)=>{
     if(error)
     {
         return console.log('Unable to connect to database')
     }
     const db=client.db(databaseName)
db.collection('Tasks').deleteOne({
  description: 'Run'
}).then((result)=>{
  console.log(result.modifiedCount)
}).catch((error)=>{
console.log(error)
})


     
 })