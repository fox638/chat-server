import { IsEmail } from 'class-validator';
import { AbstractEntity } from 'common/abstract.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserDto } from 'user/dto/user.dto';
import * as bcrypt from 'bcryptjs';
import { ChatEntity } from 'modules/chat/entities/chat.entity';
import { MessageEntity } from 'modules/message/entities';

@Entity({ name: 'user' })
export class UserEntity extends AbstractEntity<UserDto> {
  @Column({ type: 'text', nullable: true })
  username: string;

  @Column({ type: 'text', unique: true })
  @IsEmail()
  email: string;

  @Column({ type: 'boolean', default: false })
  verifyEmail: boolean;

  @Column({ type: 'text', unique: true, nullable: true })
  verifyKey: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  salt: string;

  @ManyToMany((type) => ChatEntity, (chats) => chats.users)
  chats: ChatEntity[];

  @OneToMany((type) => MessageEntity, (message) => message.user)
  messages: MessageEntity;

  async validationPassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  dtoClass = UserDto;
}
