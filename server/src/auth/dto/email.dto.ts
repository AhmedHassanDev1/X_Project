import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SendEmailDTORequest{
    @IsEmail() 
    @IsNotEmpty()
    email:string
}

export class EmailVerificationDTORequest{
    @IsEmail() 
    @IsNotEmpty()
    email:string

    @IsNotEmpty({message:"Verification code is required."})
    code:string
}

export class EmailVerificationDTOResponse{
    @IsNotEmpty() 
    verification_token:string
}