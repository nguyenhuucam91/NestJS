import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Global()
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const dialect = configService.get('database.default')
        return {
          dialect,
          host: configService.get(`database.${dialect}.host`),
          port: configService.get(`database.${dialect}.port`),
          username: configService.get(`database.${dialect}.user`),
          password: configService.get(`database.${dialect}.password`),
          database: configService.get(`database.${dialect}.database`),
          models: [__dirname + '/../../models/**/*.model.ts'],
          autoLoadModels: true,
          synchronize: true
        }
      },
    })
  ],
  exports: [DatabaseModule]
})
export class DatabaseModule {
}
