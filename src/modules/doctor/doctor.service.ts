import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DocumentDoctor } from 'src/schemas';
import _ from 'lodash';

@Injectable()
export class DoctorService {
   constructor(
      @InjectModel(Doctor.name) private doctorModel: Model<DocumentDoctor>,
   ) {}

   async findAll({ page = 1, limit = 15, term }) {
      const end = page * limit;
      const start = end - limit;

      let query: More = {};

      if (term) {
         query.firstName = {
            $regex: term,
         };
      }

      const total = await this.doctorModel.countDocuments(query);

      const items = await this.doctorModel
         .find(query)
         .skip(start)
         .limit(limit)
         .exec();

      const pages = Math.ceil(total / limit);

      const data = {
         items,
         pagination: {
            total,
            page,
            pages,
            hasPrevPage: page - 1 >= 1 ? true : false,
            hasNextPage: page + 1 <= pages ? true : false,
         },
      };

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
      const data = await this.findOne(id);

      for (const [key, value] of Object.entries(input)) {
         if (value) {
            data[key] = value;
         }
      }

      return await data.save();
   }

   async delete(id: string) {
      const data = await this.doctorModel.deleteOne({
         _id: id,
      });

      return data?.ok;
   }

   async bulkDelete(ids: string[]) {
      const data = await this.doctorModel.deleteMany({
         _id: {
            $in: ids,
         },
      });

      return data?.ok;
   }
}
