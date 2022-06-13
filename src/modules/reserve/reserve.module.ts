import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RecordController } from './record/record.controller';
import { VisitorController } from './visitor/visitor.controller';
import { VisitorService } from './visitor/visitor.service';
import { RecordService } from './record/record.service';
import { MongooseModule } from '@nestjs/mongoose';
import { recordSchema } from './schemas/record.schema';
import { visitorSchema } from './schemas/visitor.schema';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RecordResolver } from '../reserve/resolvers/record.resolver';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Record', schema: recordSchema }, //引入预约记录表
      { name: 'Visitor', schema: visitorSchema }, //引入访客表
    ]),
    // jwt
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [RecordController, VisitorController],
  providers: [
    VisitorService,
    RecordService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    RecordResolver,
  ],
})
export class ReserveModule {}
