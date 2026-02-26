import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateUserDTORequest } from "src/user/dto/user.dto";

export class SignUpDTORequest extends OmitType(CreateUserDTORequest, ["password"] as const) {

    @IsNotEmpty()
    password: string
    @IsNotEmpty()
    verification_token: string
}


export class SignUpDTOResponse {
    @IsString()
    @IsNotEmpty()
    access_token: string

    @IsString()
    @IsOptional()
    refresh_token: string
}

export class SignInDTORequest extends PickType(CreateUserDTORequest, ["email"] as const) {
    @IsNotEmpty()
    password: string
}


export class SignInDTOResponse extends OmitType(SignUpDTOResponse, ["refresh_token"] as const) { }

export class AccessTokenPayloadDTO extends PartialType(CreateUserDTORequest) {
    @Expose()
    @IsString()
    _id: string
    @Expose()
    @IsString()
    name: string
    @Expose()
    @IsString()
    email: string

}