import { Breed } from 'src/breeds/entities/breed.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Cat {
  //@PrimaryGeneratorColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Breed, (breed) => breed.id, {
    eager: true, // para que traiga las raza la hacer un findOne de manera ansiosa
  })
  breed: Breed;
}
