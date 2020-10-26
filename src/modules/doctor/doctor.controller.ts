import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   Patch,
   Post,
   Query,
} from '@nestjs/common';
import { DoctorService } from './doctor.service';

@Controller('doctor')
export class DoctorController {
   constructor(private readonly doctorService: DoctorService) {}

   @Get()
   async getDoctors(
      @Query('page') page: number,
      @Query('limit') limit: number,
      @Query('term') term: string,
   ) {
      const data = this.doctorService.findAll({
         page: page ? Number(page) : undefined,
         limit: limit ? Number(limit) : undefined,
         term,
      });

      return data;
   }

   @Get(':id')
   async getDoctor(@Param('id') id: string) {
      const data = this.doctorService.findOne(id);
      return data;
   }

   @Post()
   async createDoctor(@Body() input: any) {
      const data = await this.doctorService.create(input);

      return data;
   }

   @Patch(':id')
   async updateDoctor(@Param('id') id: string, @Body() input: More) {
      const data = await this.doctorService.update(id, input);

      return data;
   }

   @Delete(':id')
   async deleteDoctor(@Param('id') id: string) {
      const data = await this.doctorService.delete(id);
      return data ? true : false;
   }

   @Delete()
   async bulkDeleteDoctor(@Body() input: More) {
      const data = await this.doctorService.bulkDelete(input?.ids ?? []);

      return data;
   }
}
