const express = require('express')
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 5171
const cors = require('cors')

app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/mernstack_crud').then(()=>{
    console.log('dbs connected sucessfully')
}).catch((err)=>{
    console.log(err)
})

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},{timestamps:true})
const User = new mongoose.model('User' , userSchema)
//   C
app.post('/createuser' , async(req,res)=>{
 try{
const user = new User(req.body)  ;
const userData = await user.save()  ;
res.send(userData) ;
 }catch(err){
    res.send(err)
 }
})
//   R
app.get('/readallusers' , async(req,res)=>{
  try{
   const userData = await User.find();
   res.send(userData);
  }catch(err){
    res.send(err)
  }
})
//   R (individual)
app.get('/readuser/:id' , async(req,res)=>{
 try{
   const id = req.params.id;
   const userData = await User.findById({_id : id});
   res.send(userData);
 }catch(err){
    console.log(err)
 }
})
// U
app.patch('/updateuser/:id' , async(req,res)=>{
    try {
        const id = req.params.id ; 
        const updateData = await User.findByIdAndUpdate({_id:id} , req.body , {new:true});
        res.send(updateData);
        
    } catch (error) {
        res.send(error);
    }
})

//   D
app.delete('/deleteuser/:id' , async(req,res)=>{
    try {
        const id = req.params.id ;
        const deleteuser = await User.findByIdAndDelete({_id:id})
        res.send(deleteuser)
    } catch (error) {
        res.send(error)
    }
})

app.listen(port , (err)=>{
    console.log('server is being listened at port' , port)
})