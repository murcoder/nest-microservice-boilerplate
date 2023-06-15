import {registerAs} from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('server', () => {
    const server = {
        server_port: process.env.SERVER_PORT
    };
    const schema = Joi.object({
        server_port: Joi.number().required()
    })

    const {error} = schema.validate(server, {abortEarly: false })

    if(error) {
        throw new Error(`Validation failed ${error.message}`)
    }

    return server;
})