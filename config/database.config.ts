import {registerAs} from '@nestjs/config';
import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';
import * as Joi from 'joi';

export default registerAs('database', () => {
    const db: MysqlConnectionOptions = {
        type: 'mysql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: []
    };

    const schema = Joi.object({
        type: Joi.string().required().valid('mysql'),
        host: Joi.string().required(),
        port: Joi.number().required(),
        password: Joi.string().required(),
        database:  Joi.string().required(),
        entities:  Joi.array().required(),
        username: Joi.string().required(),
    })

    return db;
})