const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("server is up on port " + port);
});

// const bcrypt=require('bcryptjs')

// const myFunction= async()=>{
//     const password='jama123'
//     const harshPassword= await bcrypt.hash(password,8)
//     console.log(password)
//     console.log(harshPassword)

//     const isMatch=await bcrypt.compare('jAma123',harshPassword)
//     console.log(isMatch)
// }

// myFunction()

// const jwt=require('jsonwebtoken')

// const myFunction1=()=>{
//    const token=jwt.sign({_id:'jamam124'},'thisisnodecaurse',{expiresIn:'7 days'})

//    const data= jwt.verify(token,'thisisnodecaurse')
//    console.log(data)

// }

// myFunction1()
