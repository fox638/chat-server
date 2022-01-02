import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AbstractDto } from './dto/AbstractDto';
import { UtilsService } from './utils.service';

export abstract class AbstractEntity<
  T extends AbstractDto = AbstractDto
> extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    name: 'updated_at',
  })
  updatedAt: Date;

  abstract dtoClass: new (entity: AbstractEntity, options?: any) => T;

  toDto(options?: any) {
    return UtilsService.toDto(this.dtoClass, this, options);
  }
}
