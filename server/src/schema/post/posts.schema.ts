import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "../user/user.schema";
import { PostStatistics } from "./statistics.schema";

@Schema({ timestamps: false, id: false })
export class MediaSchema {
    @Prop({ required: true })
    public_id: string

    @Prop({ required: true })
    url: string

    @Prop()
    thumbnail?: string

    @Prop()
    format?: string

    @Prop()
    type?: string

    @Prop()
    width: number

    @Prop()
    height: number

    @Prop()
    size: number
}

@Schema({ timestamps: true, id: true })
export class Post {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    user: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
    original: mongoose.Types.ObjectId

    @Prop()
    text: string

    @Prop({ required: true, enum: ["post", "replay", "repost"], default: "post" })
    type: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
    original_post: mongoose.Types.ObjectId

    @Prop({ type: PostStatistics, default: () => ({}) })
    statistics: PostStatistics

    @Prop({ type: [MediaSchema] })
    media: MediaSchema

}

export const PostSchema = SchemaFactory.createForClass(Post);
