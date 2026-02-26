import { Exclude, Expose, Transform, Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { MediaDTO } from "./userEdite.dto";

export class CreateUserDTORequest {
   @IsString()
   @IsNotEmpty()
   name: string

   @IsEmail()
   email: string

   @IsString()
   @IsOptional()
   password: string

   @IsOptional()
   @IsString()
   birth_date: string

}

export class UserDTO {
   
   @Expose()
   @IsString()
   _id:string
   
   @Expose()
   @IsString()
   name: string

   @Expose()
   @IsString()
   email: string

   @Expose()
   @IsString()
   bio: string

   @Expose()
   @IsString()
   location: string

   @Exclude()
   password: string

   @Expose()
   @IsNumber()
   isFollow?: boolean

   @Expose()
   @IsNumber()
   followers_count: number

   @Expose()
   @IsNumber()
   followings_count: number

   @Expose()
   @IsString()
   createdAt: string

   @Expose()
   @ValidateNested()
   @Type(() => MediaDTO)
   @Transform(({ value }) => value ? value.url : null)
   image: MediaDTO

   @Expose()
   @ValidateNested()
   @Type(() => MediaDTO)
   @Transform(({ value }) => value ? value.url : null)
   profile_image: MediaDTO
}
