import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class LoginInput {
  @Field(() => String)
  @IsString({ message: 'Почта повинна бути строкою' })
  @IsNotEmpty({ message: 'Почта повинна бути обовязковою до заповнення' })
  @IsEmail({}, { message: 'Не валідна електронна адреса' })
  email!: string;

  @Field(() => String)
  @IsString({ message: 'Пароль повиннен бути строкою' })
  @IsNotEmpty({ message: 'Пароль повиннен бути обовязковою до заповнення' })
  @MinLength(6, { message: 'Пароль повинен містити не менше 6 символів' })
  @MaxLength(128, { message: 'Пароль не повинен містити більше 128 символів' })
  password!: string;
}