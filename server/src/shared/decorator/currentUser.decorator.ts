import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const ctxType = ctx.getType<'http' | 'graphql'>();
    let user: any;

    if (ctxType === 'http') {
      user = ctx.switchToHttp().getRequest().user;
    } else if (ctxType === 'graphql') {
      const gqlCtx = GqlExecutionContext.create(ctx).getContext();
      user = gqlCtx.req.user;
    }
      
    return data ? user?.[data] : user;
  },
);