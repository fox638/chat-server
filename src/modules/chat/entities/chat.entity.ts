import { MessageEntity } from 'modules/message/entities';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'user/entities/user.entity';
import { ChatType } from '../types';

@Entity({
  name: 'chat',
})
export class ChatEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ChatType,
    default: ChatType.Dialog,
  })
  type: ChatType;

  @ManyToMany((type) => UserEntity, (user) => user.chats)
  @JoinTable()
  users?: UserEntity[];

  @OneToMany((type) => MessageEntity, (message) => message.chat)
  messages?: MessageEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
