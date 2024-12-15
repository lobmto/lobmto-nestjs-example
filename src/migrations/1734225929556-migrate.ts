import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1734225929556 implements MigrationInterface {
    name = 'Migrate1734225929556'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."status_status_enum" AS ENUM('UP')`);
        await queryRunner.query(`CREATE TABLE "status" ("id" SERIAL NOT NULL, "status" "public"."status_status_enum" NOT NULL, CONSTRAINT "PK_e12743a7086ec826733f54e1d95" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "status"`);
        await queryRunner.query(`DROP TYPE "public"."status_status_enum"`);
    }

}
