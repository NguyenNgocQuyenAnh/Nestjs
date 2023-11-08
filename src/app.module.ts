import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/event.entity';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import ormConfig from './config/orm.config';
import ormConfigProd from './config/orm.config.prod';
import { AppDummy } from './app.dummy';
import { AppJapanService } from './app.japan.service';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
      envFilePath:`${process.env.NODE_ENV}.env`
    }),
    TypeOrmModule.forRootAsync({
      useFactory: process.env.NODE_ENV !== 'production'
        ? ormConfig : ormConfigProd
    }),
    EventsModule,
    SchoolModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: AppService,
    useClass: AppJapanService
  }, {
    provide: 'APP_NAME',
    useValue: 'Nest Events Backend!'
  }, {
    provide: 'MESSAGE',
    inject: [AppDummy],
    useFactory: (app) => `${app.dummy()} Factory!`
  }, AppDummy],
})
export class AppModule {}
