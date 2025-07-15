import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    googleId:{
        type:String,
        unique:true,
        sparse:true
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String,
        minLength:6
    }
})

userSchema.pre('save',async function(next){
    try {
        const user = this;
        if(!user.isModified('password')){
            return next;
        }
    const salt  = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password,salt);
    user.password = hashPassword;
    next();
    } catch (error) {
        throw next(error);
    }
})

userSchema.methods.comparePassword = async function(password) {
    try {
        const isMatch = await bcrypt.compare(password,this.password);
        return isMatch;
    } catch (error) {
        return error;
    }
}

const urlUser = mongoose.model("urlUser",userSchema);

export default urlUser;