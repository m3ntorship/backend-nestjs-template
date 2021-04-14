import { EntityRepository, Repository } from 'typeorm';
import { ModuleExample } from './moduleExample.entity';

@EntityRepository(ModuleExample)
export class ModuleExampleRepository extends Repository<ModuleExample> {}
