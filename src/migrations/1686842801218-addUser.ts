import {MigrationInterface, QueryRunner} from "typeorm";
import {User} from '../auth/user.entity';

export class AddUser1686842801218 implements MigrationInterface {
    name = 'AddUser1686842801218'

    public async up(queryRunner: QueryRunner): Promise<void> {

        const user = new User();
        user.id = 1;
        user.username = 'armin';
        const salt = await user.genSalt();
        user.password = await user.hashPassword('armin', salt)

        await queryRunner.manager.getRepository(User).save(user)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
