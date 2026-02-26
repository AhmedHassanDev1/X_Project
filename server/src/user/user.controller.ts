import { Controller, Get, Put, Param, Body, UsePipes, UseInterceptors, UploadedFiles, HttpException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { MongoIdValidationPipe } from 'src/shared/pipe/mongoID.pipe';
import { MediaDTO, UserEditeDTO } from './dto/userEdite.dto';
import { CloudinaryService } from 'src/shared/services/cloud.service';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/shared/decorator/currentUser.decorator';
import { AccessTokenPayloadDTO } from 'src/auth/dto/auth.dto';


@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloud: CloudinaryService
  ) { }

  @Get("/me")
  async ME(@CurrentUser("_id") userId: string) {
    let user = await this.userService.getProfileInfo(userId)
    return { ...user, isFollow: true }

  }

  @Get("/suggested-people")
  async SuggestedPeople(
    @CurrentUser("_id") userId: string,
    @Query("cursor") cursor: string | null,
    @Query("limit") limit: number,
  ) {
    return await this.userService.getSuggestedPeople(userId, cursor, limit)
  }

  @Get("/:id")
  async getProfileInfo(
    @CurrentUser("_id") userId: string,
    @Param("id", MongoIdValidationPipe) id: string
  ) {
    let user = await this.userService.getProfileInfo(id)
    let isFollow = await this.userService.isFollow(userId,id)
    return { ...user, isFollow }
  }
  
  @Get("/:id/stat")
  async getProfileStat(
    @CurrentUser("_id") userId: string,
    @Param("id", MongoIdValidationPipe) id: string
  ) {
    let stat = await this.userService.getProfileStat(id)
 
    return stat
  }

  @Put("/edite")
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'userImage', maxCount: 1 },
      { name: 'profileImage', maxCount: 1 },
    ])
  )
  async EditeProfile(
    @CurrentUser("_id") id: string,
    @Body() body: UserEditeDTO,
    @UploadedFiles() images: {
      userImage?: Express.Multer.File[];
      profileImage?: Express.Multer.File[];
    }
  ) {
    try {

      let { userImage, profileImage } = images
      if (userImage?.length) {
        let img = await this.cloud.uploadImage(userImage[0])
        body.image = { ...plainToInstance(MediaDTO, img, { excludeExtraneousValues: true }) }
      }
      if (profileImage?.length) {
        let img = await this.cloud.uploadImage(profileImage[0])
        body.profile_image = { ...plainToInstance(MediaDTO, img, { excludeExtraneousValues: true }) }
      }

      await this.userService.EditeProfile(id, body)
    } catch (err) {
      if (body.image) await this.cloud.deleteFile(body.image.public_id)
      if (body.profile_image) await this.cloud.deleteFile(body.profile_image.public_id)
      throw new HttpException(err?.message, err.status)
    }
  }

}
