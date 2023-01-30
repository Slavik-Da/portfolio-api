import { Module } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<'postgres'>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_IS_SYNCHRONIZED'),
        logging: configService.get<boolean>('DB_IS_LOGGING'),
        migrations: configService.get<string[]>('DB_MIGRATIONS'),
        migrationsRun: configService.get<boolean>('DB_MIGRATIONS_RUN'),
        migrationsTableName: configService.get<string>(
          'DB_MIGRATIONS_TABLE_NAME'
        ),
      }),
    }),
  ],
})
export class DatabaseModule {}
