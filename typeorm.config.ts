import {DataSource} from 'typeorm';
import {ConfigService} from '@nestjs/config';
import {User} from './src/auth/user.entity';
import {config} from 'dotenv';
import {InitDB1686842476519} from './src/migrations/1686842476519-initDB';

config();

const configService = new ConfigService()

export default new DataSource({
    type: 'mysql',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),

    entities: [
        User
    ],
    migrations: [InitDB1686842476519],
});
