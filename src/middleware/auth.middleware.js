
export const isAuth = async(req,res,next)=>{
    try {
        if(req.isAuthenticated() && req.user){
            return next();
        }
        if(req.isAuthenticated() && !res.user){
            return res.status(404).json({message:"user not found"})
        }
        return res.status(505).json({message:"session expired, Please login again"})
    } catch (error) {
        console.log("error in isAuth middleware",error);
        return res.status(500).json({message:"Unauthorized"})
    }
}