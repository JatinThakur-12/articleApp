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

export const Post = mongoose.model("Post", postSchema);