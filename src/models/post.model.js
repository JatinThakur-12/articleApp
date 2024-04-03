import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            unique: true,
            trim: true,
        },
        title: {
            type: String,
            required: [true,"provide title for post"],
            trim: true
        },
        desc: String,
        category: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    {
        timestamps: true
    }
);

const Post = mongoose.models.posts || mongoose.model("posts", postSchema);
export default Post;