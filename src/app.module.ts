import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoctorModule } from './modules/doctor/doctor.module';

@Module({
   imports: [
      MongooseModule.forRoot('mongodb://localhost/doctor-management'),

      forwardRef(() => DoctorModule),
   ],
   controllers: [AppController],
   providers: [AppService],
})
export class AppModule {}
