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
    //  db.collection('users').insertOne({
    //      name: 'Anshuman Singh Bais',
    //      age:20
    //  },(error,result)=>{
    //      if(error)
    //      {
    //          return console.log('User undefined')
    //      }
    //      console.log(result.connection)
    //  })

//   db.collection('users').insertMany([
//       {
//         name: 'Anshuman Singh Bais',
//         age:20
//       },
//       {
//         name: 'Sam Curran',
//        age:25
//       }
//     ],(error,result)=>{
//     if(error)
//          {
//              return console.log('User undefined')
//          }
//          console.log(result.ops)
//   })

// db.collection('Tasks').insertMany([
//     {
//       description: 'Study',
//       completed:true
//     },
//     {
//         description: 'Play',
//         completed:true
//       },
//       {
//         description: 'Cry',
//         completed:false
//       }
//   ],(error,result)=>{
//   if(error)
//        {
//            return console.log('User undefined')
//        }
//        console.log(result.ops)
// })
db.collection('Tasks').deleteOne({
  description: 'Fuck'
}).then((result)=>{
  console.log(result.modifiedCount)
}).catch((error)=>{
console.log(error)
})


     
 })