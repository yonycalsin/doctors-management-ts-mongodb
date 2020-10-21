import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type DocumentDoctor = Doctor & Document;

@Schema()
class Doctor {
   @Prop()
   code: string;

   @Prop()
   tuitionNumber: string;

   @Prop()
   firstName: string;

   @Prop()
   paternalSurname: string;

   @Prop()
   maternalSurname: string;

   @Prop()
   specialty: string;
}

const SchemaDoctor = SchemaFactory.createForClass(Doctor);

export { Doctor, SchemaDoctor, DocumentDoctor };
