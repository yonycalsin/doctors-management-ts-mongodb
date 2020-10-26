import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

type DocumentDoctor = Doctor & Document;

@Schema({
   timestamps: true,
})
class Doctor extends Document {
   get id() {
      return this._id;
   }

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

   createdAt: Date;
   updatedAt: Date;
}

const SchemaDoctor = SchemaFactory.createForClass(Doctor);

SchemaDoctor.virtual('id', {
   localField: '_id',
   justOne: true,
});

export { Doctor, SchemaDoctor, DocumentDoctor };
