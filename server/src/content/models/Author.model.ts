import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class Author {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field( {nullable:true})
    image: string;

      @Field()
      isFollow: boolean;
}