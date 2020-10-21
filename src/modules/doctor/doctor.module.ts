import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, SchemaDoctor } from 'src/schemas';

@Module({
   imports: [
      MongooseModule.forFeature([
         {
            name: Doctor.name,
            schema: SchemaDoctor,
         },
      ]),
   ],
   providers: [DoctorService],
   controllers: [DoctorController],
})
export class DoctorModule {}
