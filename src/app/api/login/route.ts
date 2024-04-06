import { connect } from "@/db/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(req: NextRequest) {
    try {
        console.log("Request received");
        const reqBody = await req.json();
        const { email, password } = reqBody;

        if(!email.trim() || !password){
            return NextResponse.json({error: "Empty email or password field"},{status: 400});
        }

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json({error: "User does not exist"},{status: 400});
        }

        console.log("User exist:",user);

        const validatePassword = await bcryptjs.compare(password, user.password);

        if(!validatePassword){
            return NextResponse.json({error: "Invalid email or password"});
        }

        const tokenData = {
            id: user._id,
            email: user.email
        };

        // generating token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});

        const response = NextResponse.json({
            message: "User logged in successfully",
            success: true
        });

        response.cookies.set("token",token,{
            httpOnly: true
        });

        return response;


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}