import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';
import { Breed } from 'src/breeds/entities/breed.entity';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat)
    private readonly catRepo: Repository<Cat>,
    @InjectRepository(Breed)
    private readonly breedRepo: Repository<Breed>,
  ) {}

  async create(createCatDto: CreateCatDto) {
    // return await this.catRepo.save(createCatDto);

    const breed = await this.breedRepo.findOneBy({ name: createCatDto.breed });

    if (!breed) {
      throw new BadRequestException('Breed not found');
    }

    return await this.catRepo.save({
      ...createCatDto,
      breed,
    });
  }

  async findAll() {
    return await this.catRepo.find();
  }

  async findOne(id: number) {
    return await this.catRepo.findOneBy({ id });
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    // return await this.catRepo.update(id, updateCatDto);
    return;
  }

  async remove(id: number) {
    return await this.catRepo.softDelete({ id }); // eliminacion logica , se le pasa el id
    // return await this.catRepo.softDelete({ id }); // se le pasa la instancia
  }
}
