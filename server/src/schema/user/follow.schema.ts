import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./user.schema";


@Schema({ timestamps: true })
export class Follow {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    following: mongoose.Types.ObjectId
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, required: true })
    follower: mongoose.Types.ObjectId
}

export const FollowSchema = SchemaFactory.createForClass(Follow)