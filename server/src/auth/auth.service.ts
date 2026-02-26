import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotificationsService } from 'src/notifications/notifications.service';
import { AccessTokenPayloadDTO, SignInDTORequest, SignUpDTORequest, SignUpDTOResponse } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { compare, genSalt, hash } from 'bcrypt';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly notificationsService: NotificationsService,
        private readonly JWt: JwtService,
        private readonly userService: UserService,
        private readonly config: ConfigService
    ) { }

    async passwordHash(password: string): Promise<string> {
        let salt = await genSalt()
        let hashing = await hash(password, salt)
        return hashing

    }

    async passwordVerification(password: string, hash: string) {
      
        
        return await compare(password, hash)

    }

    async genToken(payload: any, expiresIn?: any, secret?: string): Promise<string> {
        return await this.JWt.signAsync(payload, expiresIn ? { expiresIn: expiresIn, secret: secret || this.config.get("JWT_SECRET") } : undefined);

    }
    async accessTokenVerification(token: string, errorMessage?: string | null) {
        try {
            let isValid = await this.JWt.verifyAsync(token)
            return isValid
        } catch (error) {
            throw new UnauthorizedException(errorMessage || "token invalid.")
        }
    }

    async emailVerification(email: string, code: string): Promise<string> {
        let isValid = await this.notificationsService.emailVerification(email, code)

        if (!isValid.verify) throw new BadRequestException("inValid code pleace try again.")
        let payload = {
            email,
            purpose: "email_verification"
        }
        return await this.genToken(payload, "25m")
    }

    async signUp(body: SignUpDTORequest): Promise<SignUpDTOResponse> {
        let accessTokenVerification = await this.accessTokenVerification(body.verification_token)
        if (accessTokenVerification?.purpose != "email_verification" && accessTokenVerification?.email != body.email) {
            throw new BadRequestException("inValid code pleace try again.")
        }

        let { password } = body
        body.password = await this.passwordHash(password)

        let user = await this.userService.createAccount(body)

        let accessTokenPayload = {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user?.image || null
        }
        let access_token = await this.genToken({ ...accessTokenPayload }, "10d")

        let refresh_token = await this.genToken({ ...accessTokenPayload }, "20d", this.config.get("REFRESH_SECRET"))

        return { access_token, refresh_token }
    }

    async loginIn(body: SignInDTORequest): Promise<SignUpDTOResponse> {
        let { email, password } = body
        let emailIsExists = await this.userService.emailIsExists(email)
        if (!emailIsExists) throw new NotFoundException("user not found.")
        let user = await this.userService.getByEmail(email)
        let { password: hashing } = user || {}
        console.log(user);
        
        let validPassword =await this.passwordVerification(password, hashing || " ")
           console.log(validPassword);
                   
        if (!validPassword) throw new UnauthorizedException("email or password invalid.")
        let accessTokenPayload = {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            image: user?.image
        }

        let access_token = await this.genToken({ ...accessTokenPayload }, "10d")
        console.log(await this.accessTokenVerification(access_token));

        let refresh_token = await this.genToken({ ...accessTokenPayload }, "20d", this.config.get("REFRESH_SECRET"))
        return { access_token, refresh_token }

    }


}
