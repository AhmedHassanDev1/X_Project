import { Type } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";

export class MediaPostDTO {
    @IsString()
    public_id: string

    @IsString()
    url: string

    @IsNumber()
    width: number
    
    @IsNumber()
    height: number

    @IsNumber()
    size: number
}

export class PostDTO {
    @IsString()
    _id: string

    @IsString()
    text?: string

    @ValidateNested()
    @Type(() => MediaPostDTO)
    media: MediaPostDTO[]

    @IsString()
    createdAt: string
}