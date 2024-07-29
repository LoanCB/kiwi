import { MigrationInterface, QueryRunner } from 'typeorm';

export class UniqueTitles1722240597080 implements MigrationInterface {
  name = 'UniqueTitles1722240597080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`category\`
            ADD UNIQUE INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\` (\`title\`)
        `);
    await queryRunner.query(`
            ALTER TABLE \`keyword\`
            ADD UNIQUE INDEX \`IDX_a1af8669df11217cf8d9789d41\` (\`title\`)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`keyword\` DROP INDEX \`IDX_a1af8669df11217cf8d9789d41\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`category\` DROP INDEX \`IDX_9f16dbbf263b0af0f03637fa7b\`
        `);
  }
}
