import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This decorator is especially helpful for endpoints like get profile where the signed jwt will be used to extract the user id and make a get request by id, and if no jwt, throw Unauthorized error
 */
export const getDetails = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = request.headers['authorization'].replace('Bearer ', '');

  // decode the token using any library here (below is only analogy)
  // const payload = decodeTokenToJWT(token)
  // return payload;
  return { id: 1, email: 'a@gmail.com' };
});
