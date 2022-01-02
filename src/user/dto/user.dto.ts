import { AbstractDto } from 'common/dto/AbstractDto';
import { UserEntity } from 'user/entities/user.entity';

export class UserDto extends AbstractDto {
  username: string;
  email: string;

  constructor(user: UserEntity) {
    super(user);
    this.username = user.username;
    this.email = user.email;
  }
}
