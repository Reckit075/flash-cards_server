import mongoose from 'mongoose';

const URI = 'mongodb+srv://dbUser:dbUser@cluster0.a22g5.mongodb.net/test?retryWrites=true&w=majority'

const connectDB = async() =>{
    await mongoose.connect(URI,{
        useUnifiedTopology:true,
        useNewUrlParser:true
    })
    console.log('db connected :-)')
 }

export default connectDB