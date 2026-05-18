import { Args, Resolver, Context, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import type { GqlContext } from 'src/common/interfaces/gql-context.interface';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  register(@Context() { res }: GqlContext, @Args('data') input: RegisterInput) {
    return this.authService.register(res, input);
  }

  @Mutation(() => AuthModel)
  login(@Context() { res }: GqlContext, @Args('data') input: LoginInput) {
    return this.authService.login(res, input);
  }

  @Mutation(() => AuthModel)
  refresh(@Context() { req, res }: GqlContext) {
    return this.authService.refresh(req, res);
  }

  @Mutation(() => Boolean)
  logout(@Context() { res }: GqlContext) {
    return this.authService.logout(res);
  }
}
