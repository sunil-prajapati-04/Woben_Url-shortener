import User from '../models/auth.model.js';



export const googleCallback = async(req,res)=>{
    try {
        const user = req.user;
        if(!user){
            return res.status(404).json({message:"Google authentication failed"})
        }
        return res.status(200).json({messgae:"Sign successfully"})
    } catch (error) {
        console.log("error in googleCallback controller",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const signup = async (req,res)=>{
    try {
        const {username,email,password} = req.body;
        const user  = await User.findOne({email});
        if(user){
            return res.status(401).json({message:"email id already exists"})
        }
        if(!username || !email || !password){
            return res.status(404).json({message:"All fields are required"});
        }
        if(password.length< 6){
            return res.status(404).json({message:"password must atleast 6 character"});
        }
        const newUser = new User({
            username,
            email,
            password
        })
        await newUser.save();
        return res.status(200).json({message:"Registered successfully"});
    } catch (error) {
        console.log("error in signup controller",error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(404).json({message:"Invaild email or password"})
        }
        req.login(user,(err)=>{
            if(err){
                return res.status(500).json({message:"login failed"})
            }
            console.log(user);
            return res.status(200).json({message:"login successfully"})
        })
    } catch (error) {
        console.log("error in login controller",error);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const myProfile = async(req,res)=>{
    try {
        const user = req.user;
        return res.status(200).json(user)
    } catch (error) {
        console.log("error in myProfile controller",error);
        return res.status(500).json({message:"Internal server error"})
    }
}


export const logout  = async(req,res)=>{
        const user = req.user;
        req.logout(user,(err)=>{
            if(err){
                console.log("error in logout controller",err);
                return res.status(500).json({message:"Internal server error"})
            }
            req.session.destroy((err)=>{
                if(err){
                    console.log("error in destroying session",err);
                    return res.status(500).json({message:"logout failed"})
                }
                res.clearCokkie("connect.sid");
                return res.status(200),json({messgae:"Logout successfully"})
            })
        })
}


