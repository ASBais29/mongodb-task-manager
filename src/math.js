const ftoc=(temp)=>{
return (temp-32) /1.8
}
const ctof=(temp)=>{
    return (temp*1.8) +32
    }

const add=(a,b)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            if(a<0||b<0)
            return reject ('Negative')
          resolve(a+b)
        },5000)
    })
}    

    module.exports={
        ftoc,
        ctof,
        add
    }