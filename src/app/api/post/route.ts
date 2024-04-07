import { connect } from "@/db/dbConfig";
import Post from "@/models/post.model"
import User from "@/models/user.model";
import { getUserDataFromToken } from "@/utils/getUserDataFromToken";
import { NextRequest, NextResponse } from "next/server"

connect()

// request for adding a new post
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();

        const { slug, title, desc, category, image} = reqBody;
        const userId = await getUserDataFromToken(req);

        if(title.trim() === ""){
            return NextResponse.json({error: "Please provide an appropraite post title."})
        };

        const newPost = new Post({
            slug, 
            title, 
            desc, 
            category, 
            image, 
            author: userId
        });

        const savedPost = await newPost.save();
        console.log("Saved Post: ", savedPost);

        return NextResponse.json({message: "Post craeted successfully.",success: true},{status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// request for getting a particular post
export async function GET(req: NextRequest) {
    try {

        // const reqBody = await req.json();
        // console.log("error");
        const searchParams = req.nextUrl.searchParams
        const slug = searchParams.get('slug')

        // const {slug} = query;

        if(!slug || typeof slug !== 'string' || slug.trim() === ""){
            return NextResponse.json({error: "Invalid input"},{status: 400});
        }
        console.log("abcd");

        // const postData = await Post.findOne({slug}).populate('author',['name','_id']);
        const postData = await Post.findOne({slug});
        postData.author = await User.findById(postData.author).select("_id, name")

        if(!postData){
            return NextResponse.json({error: "Requested post does not exist"},{status: 400});
        }

        console.log("Post Data:", postData );

        return NextResponse.json({data: postData},{status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

// request for deleting a particular post
export async function DELETE(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams
        const slug = searchParams.get('slug');
        const userId = await getUserDataFromToken(req);

        if(slug?.trim()===""){
            return NextResponse.json({error: "Invalid input"},{status: 400});
        }

        const postData = await Post.findOne({slug});

        if(!postData){
            return NextResponse.json({error: "Requested post does not exist"},{status: 400});
        }

        console.log("Retrieved Post:", postData);

        
        
        if(postData.author != userId){
            return NextResponse.json({error: "Request cannot be processed"},{status: 400})
        }

        const deletedPost = await Post.findByIdAndDelete(postData._id);

        console.log("Deleted Post:", deletedPost);

        return NextResponse.json({message: "post deleted successfully", data: {_id: deletedPost.id}, success: true},{status: 200});

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

