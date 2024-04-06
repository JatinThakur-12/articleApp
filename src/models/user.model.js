import mongoose, { Schema } from "mongoose";


export const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a username"],
            lowercase: true,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide an email"],
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        password: {
            type: String,
            required: [true, "Please provide an email"]
        },
        mobile: {
            type: String,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    {
        timestamps: true
    }
)
const User = mongoose.models.User || mongoose.model("User", userSchema);  
export default User;