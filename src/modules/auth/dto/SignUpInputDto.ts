import { IsEmail, Length } from 'class-validator';
import { SignUpInput } from 'shared/generate/gql/graphql';

export class SignUpInputDto implements SignUpInput {
  @IsEmail()
  email: string;
  @Length(3, 10)
  password: string;
  username: string;
}
