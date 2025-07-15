import URL from "../models/url.model.js";
import { nanoid } from 'nanoid';



export const urlShortener = async(req,res)=>{
    try {
        const {originalUrl} = req.body;
        const shortId = nanoid(6);
        if(!originalUrl || !originalUrl.startsWith("https://")){
            return res.status(404).json({message:"Please Provide valid URL"});
        }
        const defaultUrl = "http://localhost:9000/woben"
        const shortendUrl = `${defaultUrl}/${shortId}`;
        const expiresAt = Date.now() + (6 * 24 * 60 * 60 * 1000); //6 Days
        const newUrl = new URL({
            originalUrl,
            shortId,
            expiry:expiresAt
        })
        const respon = await newUrl.save();
        console.log(respon);
        return res.status(200).json({message:"URL successfully shortend",yourShortendUrl:shortendUrl});
    } catch (error) {
        console.log("error in urlShortener Controller",error);
        return res.status(505).json({message:"Internal server error"})
    }
}

export const getRedirectOriginalUrl = async(req,res)=>{
    try {
        const shortId = req.params.shortId;
        const url = await URL.findOne({shortId});
        if(!url){
            return res.status(404).json({message:"Shortend Url not found"})
        }
        if(!url.expiry ||url.expiry < Date.now()){
            return res.status(404).json({message:"Link is Expiry. Please generate New One"});
        }
        url.clicksOnURL+= 1;
        await url.save();
        return res.redirect(url.originalUrl);
    } catch (error) {
        console.log("error in getRedirectOrginalUrl Controller",error);
        return res.status(505).json({message:"Internal server error"})
    }
}


export const getUrl = async(req,res)=>{
    try {
        const userId = req.user.id;
        const urls = await URL.findById(userId);
        if(!urls){
            return res.status(404).json({message:"No url found"})
        }
        return res.status(200).json(urls)
    } catch (error) {
        console.log("error in getUrl Controller",error);
        return res.status(505).json({message:"Internal server error"})
    }
}