import { ChatEntity } from 'modules/chat/entities/chat.entity';
import {
  Entity,
  Column,
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from 'user/entities/user.entity';

@Entity({
  name: 'message',
})
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => ChatEntity, (chat) => chat.messages)
  chat: ChatEntity;

  @ManyToOne((type) => UserEntity, (user) => user.messages)
  user: UserEntity;

  @Column({ type: 'text' })
  content: string;

  @CreateDateColumn() createdAt: string;

  @UpdateDateColumn() updatedAt: string;
}
