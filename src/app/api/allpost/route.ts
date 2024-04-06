import { connect } from "@/db/dbConfig";
import Post from "@/models/post.model"
import User,{userSchema} from "@/models/user.model";
import { getUserDataFromToken } from "@/utils/getUserDataFromToken";
import { NextRequest, NextResponse } from "next/server"
import mongoose, { Types } from "mongoose";
import { log } from "console";

connect()

export async function GET(req: NextRequest) {

    try {
        const userId = await getUserDataFromToken(req);

        if(!userId){
            return NextResponse.json({error:"User is not authenticated"},{status: 401});
        }
    
        const searchParams = req.nextUrl.searchParams
    
        let option: any = [];
    
        searchParams.forEach((value, key) => {
            console.log(`${key}:${value}`);
            option.push([key, value]);
        })
    
        // console.log(option);
    
        const obj = option.reduce((acc: any, [key, value]: [string, string]) => {
            acc[key] = value;
            return acc;
        }, {});
    
        if (!obj.page || obj.page < 1) {
            obj.page = 1;
        }
        if (!obj.limit) {
            obj.limit = 10;
        }
    
        // console.log(obj);        
        
        const allPost:any = await Post.find({ author: userId })
        .sort({createdAt: -1})
        .skip((obj.page - 1) * obj.limit)
        .limit(obj.limit).populate('author',['name','_id']).exec();


        const allPostLength = await (await Post.find({ author: userId })).length;
    
        // console.log(allPostLength);
        
        const noOfPages = Math.ceil(allPostLength/obj.limit);
        
    
        console.log("All post:", allPost);
    
        return NextResponse.json({ message: "post retreived", data: allPost, pages: noOfPages},{status: 200});
    
    } catch (error:any) {
        return NextResponse.json({error: error.message})
    }}