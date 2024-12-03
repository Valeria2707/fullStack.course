import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getOrmConfig } from './ormconfig';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ExhibitModule } from './exhibit/exhibit.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => getOrmConfig(configService),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ExhibitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
