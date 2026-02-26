import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Author } from "../models/Author.model";
import { CurrentUser } from "src/shared/decorator/currentUser.decorator";
import { UserService } from "src/user/user.service";


@Resolver(() => Author)
export class AuthorResolver {
    constructor(
        private readonly UserService: UserService
    ) { }
    @ResolveField(() => Boolean)
    async isFollow(@Parent() author: Author, @CurrentUser("_id") userId: string) {
        return await this.UserService.isFollow(userId, author._id)

    }


}