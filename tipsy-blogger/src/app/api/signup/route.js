import { NextResponse } from "next/server";
import { connectMongoDB } from "../../lib/mongodb";
import User from "../../models/User"
import bcrypt from "bcryptjs"

export async function POST(req) { 
    
    try {
        console.log("UserName ")

        const body = await req.json();
        const { username, password } = body;


        const hashPassword = await bcrypt.hash(password, 10)
        await connectMongoDB();

        console.log("Createding User " , username, " password " , hashPassword)

        await User.create({
            username, password: hashPassword
        });
        console.log("Created User " , username, " password " , hashPassword)


        return NextResponse.json({ message: "User registered."}, {status: 201})
    } catch (error) {
        return NextResponse.json({ message: "Error occured while signing up." }, {status: 500})
    }
}