import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class MediaDTO {
    @IsNumber()
    width: number

    @IsNumber()
    height: number

    @IsNumber()
    size: number
      
    @IsString()
    @IsNotEmpty()
    url: string

    @IsString()
    @IsNotEmpty()
    public_id: string
   
    @IsString()
    @IsOptional()
    thumbnail?: string

    @IsString()
    @IsNotEmpty()
    type: string


    @IsString()
    @IsNotEmpty()
    format: string
}
export class CreatePostRequestDTO {
    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    @ValidateNested()
    @Type(() => MediaDTO)
    media?: MediaDTO[]

    @IsString()
    @IsOptional()
    type: string

    @IsMongoId()
    @IsOptional()
    original: string
}