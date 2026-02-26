import { Expose, Type } from "class-transformer"
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"


export class MediaDTO {
    @Expose()
    @IsString()
    @IsNotEmpty()
    public_id: string
    @Expose()
    @IsString()
    @IsNotEmpty()
    url: string
}

export class UserEditeDTO {

    @ValidateNested()
    @Type(() => MediaDTO)
    @IsOptional()
    profile_image?: MediaDTO

    @ValidateNested()
    @Type(() => MediaDTO)
    @IsOptional()
    image?: MediaDTO

    @IsOptional()
    name?: string

    @IsOptional()
    bio?: string

    @IsOptional()
    location?: string
}