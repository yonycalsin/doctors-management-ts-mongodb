import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DocumentDoctor } from 'src/schemas';

@Injectable()
export class DoctorService {
   constructor(
      @InjectModel(Doctor.name) private doctorModel: Model<DocumentDoctor>,
   ) {}

   async findAll({ page = 1, limit = 15, term }) {
      const skip = (page - 1) * limit;

      let query: More = {};

      if (term) {
         query.firstName['$regex'] = term;
      }

      const data = await this.doctorModel
         .find(query)
         .skip(skip)
         .limit(limit)
         .exec();

      return data;
   }

   async findOne(id: string) {
      const data = await this.doctorModel.findById(id).exec();

      return data;
   }

   async create(input: any) {
      const data = new this.doctorModel(input);

      return await data.save();
   }

   async update(id: string, input: More) {
      const data = await this.doctorModel.updateOne(
         {
            _id: id,
         },
         input,
      );

      return data;
   }

   async delete(id: string) {
      const data = await this.doctorModel.deleteOne({
         _id: id,
      });

      return data?.ok;
   }
}
