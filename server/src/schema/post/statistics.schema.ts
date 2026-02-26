import { Prop, Schema } from "@nestjs/mongoose";


@Schema()
export class PostStatistics {
    @Prop({ default: 0 })
    likes_count: number
    @Prop({ default: 0 })
    reposts_count: number
    @Prop({ default: 0 })
    replies_count: number
    @Prop({ default: 0 })
    view_count:number
}