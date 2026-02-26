import { Body, Controller, Delete, HttpException, Patch, Post, Put, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EmailVerificationDTORequest, EmailVerificationDTOResponse, SendEmailDTORequest } from './dto/email.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { SignInDTORequest, SignUpDTORequest } from './dto/auth.dto';
import * as express from 'express';
import { Public } from 'src/shared/decorator/publicRouter.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService
  ) { }

  @Public()
  @Post('send-verification-code')
  async sendVerificationCode(@Body() { email }: SendEmailDTORequest): Promise<void> {
    await this.notificationsService.sendEmail(email)
  }
  @Public()
  @Post('email-verification')
  async emailVerification(@Body() { email, code }: EmailVerificationDTORequest): Promise<EmailVerificationDTOResponse> {
    let verification_token = await this.authService.emailVerification(email, code)

    return { verification_token }
  }
  @Public()
  @Post("sign-up")
  async signUp(@Body() body: SignUpDTORequest, @Res() res: express.Response) {
    try {
      let { access_token, refresh_token } = await this.authService.signUp(body)
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      return res.json({ access_token: access_token });
    } catch (error) {

      throw new HttpException(error.message, error.statusCode)
    }
  }
  @Public()
  @Post('sign-in')
  async signIn(@Body() body: SignInDTORequest, @Res() res: express.Response) {
    try {
      let { access_token, refresh_token } = await this.authService.loginIn(body)
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
   
      return res.json({ access_token: access_token });
      
    } catch (error) {

 
      throw new UnauthorizedException(error.message, error.statusCode)
    }
  }

  @Put('token-refresh')
  async tokenRefresh(@Req() req) {
    let access_token = await this.authService.genToken(req?.user);

    return { access_token }
  }
  @Public()
  @Delete('logout')
  async logOut() { }
  @Public()
  @Patch("/reset-password")
  async resetPassword() { }
  @Public()
  @Patch("/forget-password")
  async forgetPassword() { }

}
