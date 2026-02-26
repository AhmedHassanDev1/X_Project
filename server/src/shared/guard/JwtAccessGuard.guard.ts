// auth/jwt-access.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/publicRouter.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const handlerName = context.getHandler().name;


    
    if (isPublic||handlerName=="tokenRefresh") return true;

    const ctxType = context.getType<'http' | 'graphql' | 'ws'>();
    let token: string|null=null;
    let req: any;

    if (ctxType === 'http') {
      req = context.switchToHttp().getRequest();
      token = req.headers.authorization?.split(' ')[1];
    } else if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(context).getContext();
      req = gqlCtx.req;
      token = req.headers.authorization?.split(' ')[1];
    } else if (ctxType === 'ws') {
      const wsClient = context.switchToWs().getClient();
      token = wsClient.handshake.headers.authorization?.split(' ')[1];
    }
     
    if (!token) throw new UnauthorizedException('Token missing');

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: this.config.get('JWT_SECRET'),
      });
     
      
      if (ctxType === 'http' || ctxType === 'graphql') {
        req.user = payload;
      } else if (ctxType === 'ws') {
        const wsClient = context.switchToWs().getClient();
        wsClient.user = payload;
      }

      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
