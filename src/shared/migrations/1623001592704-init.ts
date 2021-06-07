import { MigrationInterface, QueryRunner } from 'typeorm';
import { DATABASE_SCHEMA } from '../entity.model';

// Initial migration to run whenever the microservie starts
// It mainly to create scheam & create tables used in the microservie

export class init1623001592704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS ${DATABASE_SCHEMA}`);
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "${DATABASE_SCHEMA}"."example" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "col1" character varying NOT NULL, "col2" character varying NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS ${DATABASE_SCHEMA} CASCADE`);
    await queryRunner.query(`DROP TABLE "${DATABASE_SCHEMA}"."example"`);
  }
}
