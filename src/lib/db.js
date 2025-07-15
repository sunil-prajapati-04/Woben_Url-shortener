import mongoose from "mongoose";
import { config } from "dotenv";
config();


const mongoDBURL_Online =  process.env.MongoDbURL_Online;

mongoose.connect(mongoDBURL_Online);

const db = mongoose.connection;

db.on('connected',()=>{
    console.log("database connected successfully");
})

db.on('disconnected',()=>{
    console.log(("database disconnected successfully"));
})

db.on('error',(error)=>{
    console.log("error in connecting database",error);
})

export default db;