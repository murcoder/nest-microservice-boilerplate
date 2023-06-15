import {Inject, Injectable, RequestTimeoutException} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {lastValueFrom, timeout} from 'rxjs';
import {json} from 'express';

@Injectable()
export class AppService {
    constructor(@Inject('Microservice') private readonly microserviceClient: ClientProxy) {

    }

    async getHello(): Promise<string> {
        try {
            return await lastValueFrom(
                this.microserviceClient
                    .send<string, string>('getHelloFromMS1', 'GetHelloFromRest123')
                    .pipe(timeout(10000))
            );
        } catch (error) {
            if(error.name === 'TimeoutError') throw new RequestTimeoutException();
            /**
             * TODO
             * Error HAndling in Microservice
             */
        }
    }
}
