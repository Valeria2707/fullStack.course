import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exhibit } from './entity/exhibit.entity';

@Injectable()
export class ExhibitService {
  constructor(
    @InjectRepository(Exhibit)
    private readonly exhibitRepository: Repository<Exhibit>,
  ) {}

  async create(
    description: string,
    imagePath: string,
    user: { id: number },
  ): Promise<Exhibit> {
    const exhibit = this.exhibitRepository.create({
      description,
      imagePath,
      user: { id: user.id },
    });
    return this.exhibitRepository.save(exhibit);
  }
  async findAll(): Promise<Exhibit[]> {
    return this.exhibitRepository.find();
  }

  async findOne(id: number): Promise<Exhibit> {
    return this.exhibitRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.exhibitRepository.delete(id);
  }
}
