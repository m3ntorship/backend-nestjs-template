import { Entity, Column } from 'typeorm';

import Model from '../../shared/entity.model';

@Entity('example')
export class ModuleExample extends Model {
  @Column()
  col1: string;

  @Column()
  col2: string;
}
