import { Field, Int, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class Statistics {
    
    @Field(() => Int)
    replies_count: number;

    @Field(() => Int)
    likes_count: number;

    @Field(() => Int)
    view_count: number;

    @Field(() => Int)
    reposts_count: number;
}