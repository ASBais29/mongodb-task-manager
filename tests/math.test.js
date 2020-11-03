const { ftoc, ctof, add } = require('../src/math.js')

test('Smaple test: ', () => {
    const f = ftoc(32)
    expect(f).toBe(0)
})
test('Smaple test: ', () => {
    // const c=

    expect(ctof(0)).toBe(32)
})

//  test('Add function: ',(done)=>{
//      add(5,3).then((sum)=>{
//          expect(sum).toBe(8)
//     done()
//         })

//  }) 
// test('Add function: ',async ()=>{
//    const sum=await add(55,3)
//    expect(sum).toBe(58)
// })