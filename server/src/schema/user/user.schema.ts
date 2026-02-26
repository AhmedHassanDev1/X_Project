
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({_id:false})
export class ProfileImage{
    @Prop({required:true})
    public_id:string
    @Prop({required:true})
    url:string 
}

  


@Schema({timestamps:true})
export class User {
    @Prop({required:true})
    name: string;
    
    @Prop({required:true,unique:true})
    email:string 
    
    @Prop({enum:["google","apple","github"]})
    provider:string
    
    @Prop()
    password:string
   
    @Prop()
    birth_date: number;

    @Prop()
    bio: string;

    @Prop()
    location: string;
    
    @Prop({type:ProfileImage})
    image:ProfileImage
    
   @Prop({type:ProfileImage})
   profile_image:ProfileImage
   
   @Prop({min:0,default:0}) followers_count:number
   @Prop({min:0,default:0}) followings_count:number
   @Prop({min:0,default:0}) likes_count:number
   @Prop({min:0,default:0}) images_count:number
   @Prop({min:0,default:0}) videos_count:number
   @Prop({min:0,default:0}) posts_count:number
   
   
    
}

export const UserSchema = SchemaFactory.createForClass(User);
