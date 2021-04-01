import { Entity, Column } from 'typeorm';

import Model from '../../shared/entity.model';

@Entity('posts')
export class Service extends Model {
  @Column()
  title: string;

  @Column()
  body: string;
}
