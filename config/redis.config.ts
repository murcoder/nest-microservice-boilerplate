import * as process from 'process';
import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('redis', () => {
    const redis = {
        redis_host: process.env.REDIS_HOST,
        redis_port: Number(process.env.REDIS_PORT),
        redis_password: process.env.REDIS_PASSWORD
    }
    const schema = Joi.object({
        redis_host: Joi.string().required(),
        redis_port: Joi.number().required(),
        redis_password: Joi.string().required()
    })

    const {error} = schema.validate(redis, {abortEarly: false })

    if(error) {
        throw new Error(`Validation failed ${error.message}`)
    }
    return redis
})