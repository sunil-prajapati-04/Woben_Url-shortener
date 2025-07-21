import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const urlSchema  = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"urlUser",
        // default:uuidv4()
    },
    originalUrl:{
        type:String
    },
    shortId:{
        type:String
    },
    expiry:{
        type:Date
    },
    clicksOnURL:{
        type:Number,
        default:0
    }
},
{timestamps:true}
)

const URLModel = mongoose.model("URLModel",urlSchema);

export default URLModel;