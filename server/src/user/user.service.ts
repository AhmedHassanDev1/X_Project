import { Body, ConflictException, Injectable, NotFoundException, UseInterceptors } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { EmailVerificationDTOResponse } from 'src/auth/dto/email.dto';
import { User } from 'src/schema/user/user.schema';
import { CreateUserDTORequest, UserDTO } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { UserEditeDTO } from './dto/userEdite.dto';
import { Follow } from 'src/schema/user/follow.schema';
import { SeachService } from 'src/shared/services/search.service';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        @InjectModel(Follow.name) private FollowModel: Model<Follow>,
        private readonly searchService: SeachService,

    ) { }

    async emailIsExists(email: string) {
        return await this.UserModel.exists({ email })
    }

    async getByEmail(email: string) {
        let user = await this.UserModel.findOne({ email }).lean().exec()
        if (!user) throw new NotFoundException("user not found.")
        let _id = user._id.toString()


        return user

    }

    async createAccount(body: CreateUserDTORequest) {
        let emailIsExists = await this.emailIsExists(body.email)
        if (emailIsExists) throw new ConflictException("You already have an account.")
        let user = new this.UserModel(body)
        await user.save()
        this.searchService.indexing("users", user)
        return user
    }

    async getProfileInfo(userId): Promise<UserDTO> {
        let user = await this.UserModel.findById(userId)
        if (!user) throw new NotFoundException("user not found.")
        let _id = user._id.toString()

        return { ...plainToInstance(UserDTO, user, { excludeExtraneousValues: true }), _id }
    }
    async getProfileStat(userId) {
        let stat = await this.UserModel.findById(userId)
        .select("followers_count videos_count images_count likes_count posts_count")
        if (!stat) throw new NotFoundException("user not found.")


        return stat
    }

    async isFollow(user_id: string, followingId: string): Promise<Boolean> {
        return !!await this.FollowModel.exists({
            follower: user_id,
            following: followingId
        })
    }

    async getSuggestedPeople(userId: string, cursor: string | null, limit: number = 10): Promise<UserDTO[]> {
        let res = await this.UserModel.find({ _id: { $ne: userId } })
        let users = res.map(user => {
            let _id = user._id.toString()
            return { ...plainToInstance(UserDTO, user, { excludeExtraneousValues: true }), _id }
        })
        return users
    }
    async EditeProfile(userId: string, data: UserEditeDTO) {
        const newDoc = Object.fromEntries(
            Object.entries(data).filter(([key, value]) => value !== null && value !== undefined && value !== "")
        );
        await this.UserModel.updateOne({ _id: userId }, newDoc)

    }
}
