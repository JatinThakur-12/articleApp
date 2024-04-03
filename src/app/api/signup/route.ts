import { connect } from "@/db/dbConfig";
import User from "@/models/user.model"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'

connect()

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { name, mobile, email, password } = reqBody;

        if (name.trim().length == 0 || email.trim().length == 0 || mobile.trim().length == 0 || password.trim().length == 0) {
            return NextResponse.json({ error: "Invalid input fields" })
        }

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "User already registered." }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            name,
            email,
            mobile,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log("Saved User:", savedUser);

        return NextResponse.json({ message: "User Registered Successfully" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}