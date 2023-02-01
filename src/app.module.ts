import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './database/data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
  ],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {}
}
