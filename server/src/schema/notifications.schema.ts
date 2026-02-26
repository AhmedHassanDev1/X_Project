import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user/user.schema";
import { Post } from "@nestjs/common";


@Schema({ timestamps: true, })
export class Notification {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    sender_id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    receiver_id: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Post.name })
    post_id: mongoose.Types.ObjectId;
    
    @Prop({ type: String })
    message?: string;

    @Prop({ type: Boolean, default: false })
    read: boolean;

    @Prop({ type: String, required: true, enum: ["like", "replay", "repost", "quote", "app"] })
    type: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
