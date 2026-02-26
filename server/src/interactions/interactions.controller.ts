import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { InteractionsService } from './interactions.service';
import { CreatePostRequestDTO } from './dto/interactions.dto';
import { CurrentUser } from 'src/shared/decorator/currentUser.decorator';
import { UserDTO } from 'src/user/dto/user.dto';
import { AccessTokenPayloadDTO } from 'src/auth/dto/auth.dto';
import { CloudinaryService } from 'src/shared/services/cloud.service';
import { TempFileDTO } from './dto/upload.dto';
import { MongoIdValidationPipe } from 'src/shared/pipe/mongoID.pipe';

@Controller('interactions')
export class InteractionsController {
  constructor(
    private readonly interactionsService: InteractionsService,
    private readonly cloud: CloudinaryService
  ) { }

  @Get("/cloudinary-signature")
  async getCloudSignature() {
    const signature = this.cloud.genCloudSignature()
    return signature
  }

  @Post("/save-temporary-file")
  async saveTemporaryFile(@Body() body: TempFileDTO) {

  }


  @Post("/create-post")
  async createPost(
    @CurrentUser("_id") userId: string,
    @Body() body: CreatePostRequestDTO
  ) {
    await this.interactionsService.CreatePost(userId, body)
  }

  @Post("/:post_id/like")
  async toggleLike(
    @CurrentUser("_id") userId: string,
    @Param("post_id", MongoIdValidationPipe) postId: string,

  ) {


    await this.interactionsService.toggleLike(userId, postId)
  }



  @Post("/:post_id/bookmark")
  async toggleBookmarked(
    @CurrentUser("_id") userId: string,
    @Param("post_id", MongoIdValidationPipe) postId: string
  ) {
    await this.interactionsService.toggleBookmarked(userId, postId)

  }

  @Post("/:following_id/follow")
  async toggleFollow(
    @CurrentUser("_id") userId: string,
    @Param("following_id", MongoIdValidationPipe) postId: string
  ) {
    await this.interactionsService.toggleFollow(userId, postId)

  }



  @Post("/view/:post_id")
  async view(
    @CurrentUser("_id") userId: string,
    @Param("post_id", MongoIdValidationPipe) postId: string
  ) {


  }

}
