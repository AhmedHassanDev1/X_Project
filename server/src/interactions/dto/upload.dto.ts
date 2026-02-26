import { IsNotEmpty, IsString } from "class-validator";

export class TempFileDTO {
    @IsString()
    @IsNotEmpty()
    
    public_id: string;
    @IsString()
    @IsNotEmpty()
    url: string;
    
    @IsString()
    @IsNotEmpty()
    uploadedAt: number;

}