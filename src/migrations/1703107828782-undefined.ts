import { MigrationInterface, QueryRunner } from 'typeorm';

export class Undefined1703107828782 implements MigrationInterface {
  name = 'Undefined1703107828782';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "exchange" ("exchange_id" SERIAL NOT NULL, "source_currency" character varying NOT NULL, "target_currency" character varying NOT NULL, "amount" numeric(10,6) NOT NULL DEFAULT '0', "converted_amount" numeric(10,6) NOT NULL DEFAULT '0', "rate" numeric(10,6) NOT NULL DEFAULT '0', CONSTRAINT "PK_e63cd520e969a38c958d9a10cb6" PRIMARY KEY ("exchange_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exchange_rate" ("id" SERIAL NOT NULL, "source_currency" character varying NOT NULL, "target_currency" character varying NOT NULL, "rate" numeric(10,6) NOT NULL DEFAULT '0', CONSTRAINT "PK_5c5d27d2b900ef6cdeef0398472" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exchange_rate"`);
    await queryRunner.query(`DROP TABLE "exchange"`);
  }
}
