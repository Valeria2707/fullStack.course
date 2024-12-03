import { Module } from '@nestjs/common';
import { ExhibitService } from './exhibit.service';
import { ExhibitController } from './exhibit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exhibit } from './entity/exhibit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exhibit])],
  providers: [ExhibitService],
  controllers: [ExhibitController],
})
export class ExhibitModule {}
