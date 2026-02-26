import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Message } from "./message.schema";

@Schema({ timestamps: true })
export class Chat {
    @Prop({ type: [{ type: mongoose.Types.ObjectId, ref: 'User' }], required: true, minLength: 2 })
    participants: mongoose.Types.ObjectId[]

    @Prop({ enum: ["dm", "group"], required: true, default: "dm" })
    type: "group" | "dm"

    @Prop({ enum: ['empty', "active", "archived"], required: true, default: "empty" })
    status: "archived" | "active" | "empty"

    @Prop({ type: mongoose.Types.ObjectId, ref: Message.name })
    lastMessageId: mongoose.Types.ObjectId

    @Prop({ required: true, default: new Date() })
    lastMessageAt: Date

    @Prop({ default: new Date() })
    createdAt: Date

}

export const ChatSchema = SchemaFactory.createForClass(Chat)

ChatSchema.index({
    participants: 1,
    type: 1
}, {
    unique: true
})