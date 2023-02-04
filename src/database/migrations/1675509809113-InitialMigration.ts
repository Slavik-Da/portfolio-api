import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class InitialMigration1675509809113 implements MigrationInterface {
  name = 'InitialMigration1675509809113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "hashedPassword" character varying, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "hashed_refresh_token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_5fb5d6c7332cc4737e1ba8a2f1a" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "hashed_refresh_token" ADD CONSTRAINT "FK_aeafa78a3671700e1b881f599bb" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "hashed_refresh_token" DROP CONSTRAINT "FK_aeafa78a3671700e1b881f599bb"`
    );
    await queryRunner.query(`DROP TABLE "hashed_refresh_token"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
