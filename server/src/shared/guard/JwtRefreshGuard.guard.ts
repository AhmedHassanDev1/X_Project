import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/publicRouter.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from 'src/user/dto/user.dto';

@Injectable()
export class JwtRefreshGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const ctxType = context.getType<'http' | 'graphql' | 'ws'>();

    let token: string | undefined;
    let req: any;

    // HTTP requests
    if (ctxType === 'http') {
      req = context.switchToHttp().getRequest();
      token = req.cookies?.refresh_token;

    }

    // GraphQL requests
    else if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context).getContext();
      req = gqlCtx.req;
      token = req.cookies?.refresh_token;
    }

    // WebSocket handshake
    else if (ctxType === 'ws') {
      const wsClient = context.switchToWs().getClient();
      token = wsClient.handshake?.headers?.cookie
        ?.split('; ')
        ?.find((c) => c.startsWith('refresh_token='))
        ?.split('=')[1];
    }


    if (!token) throw new UnauthorizedException('Refresh token is missing');

    try {
      let payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('REFRESH_SECRET'),
      });
      payload = plainToInstance(UserDTO, payload, { excludeExtraneousValues: true })

      if (ctxType === 'http' || ctxType === 'graphql') {
        req.user = { ...payload, refreshToken: token };
      } else if (ctxType === 'ws') {
        const wsClient = context.switchToWs().getClient();
        wsClient.user = { ...payload, refreshToken: token };
      }

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}
