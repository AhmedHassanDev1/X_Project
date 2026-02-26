import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { User } from "../user/user.schema";
import { MediaSchema } from "../post/posts.schema";

@Schema()
class ReactSchema {
    @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
    user_id: mongoose.Types.ObjectId
    @Prop({ required: true })
    reaction: string
}

@Schema({ timestamps: true })
export class Message {
    @Prop({ type: mongoose.Types.ObjectId, required: true, ref: "chat" })
    chat_id: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Types.ObjectId, required: false, ref: Message.name })
    reply: mongoose.Types.ObjectId

    @Prop({ type: mongoose.Types.ObjectId, required: true, ref: User.name })
    sender_id: mongoose.Types.ObjectId

    @Prop({ type: MediaSchema, required: false })
    media?: MediaSchema

    @Prop({ required: false })
    text?: string

    @Prop({ type: [ReactSchema], required: false, default: [] })
    react?: ReactSchema[]
    @Prop({ required: false, enum: ["image", "video", "audio"] })
    type?: "image" | "video" | "audio"

    @Prop({ type: [mongoose.Types.ObjectId], ref: User.name, default: [] })
    seen_by: mongoose.Types.ObjectId[]

    @Prop({ type: [mongoose.Types.ObjectId], ref: User.name, default: [] })
    delete_by: mongoose.Types.ObjectId[]

    @Prop({ default: "send", enum: ["send", "pending", "failed"] })
    status: string

    @Prop({ default: new Date() })
    createdAt: Date
}

export const MessageSchema = SchemaFactory.createForClass(Message)