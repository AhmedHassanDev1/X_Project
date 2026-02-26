import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "./user/user.schema";
import { Post } from "./post/posts.schema";
import mongoose from "mongoose";
@Schema({ timestamps: true })
export class Interactions {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name, required: true })
    post: mongoose.Types.ObjectId

    @Prop({ enum: ["like", "bookmark", "view"] ,required: true})
    type: string

}


export const InteractionsSchema = SchemaFactory.createForClass(Interactions)

InteractionsSchema.index(
    { user: 1, post: 1, type: 1 },
    { unique: true }
);
