import { getUserDataFromToken } from "@/utils/getUserDataFromToken";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest){
    try {
        
        const userId = await getUserDataFromToken(req);
    
        if(userId){
            return NextResponse.json({data: {_id: userId}},{status:200})
        }else{
            return NextResponse.json({error:"session expired"},{status: 400});
        }
    }
    catch (error:any) {
        return NextResponse.json({error: error.message},{status: 401})
    }
}