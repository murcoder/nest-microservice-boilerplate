import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, RedisOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import redisConfig from '../config/redis.config';
import serverConfig from '../config/server.config';
import { DatabaseConfig } from '../config/database.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import databaseConfig from '../config/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load:[redisConfig, serverConfig, databaseConfig],
    cache: true
  }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    })],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'Microservice',
    useFactory: (configService: ConfigService) => {
      const options = <RedisOptions>{
        transport: Transport.REDIS,
        options: {
          host: configService.get("redis.redis_host"),
          port: configService.get("redis.redis_port"),
          password: configService.get("redis.redis_password"),
        }
      };
      return ClientProxyFactory.create(options);
    },
    inject: [ConfigService],
  }],
})
export class AppModule { }