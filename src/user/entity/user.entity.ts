import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exhibit } from 'src/exhibit/entity/exhibit.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Exhibit, (exhibit) => exhibit.user, { cascade: true })
  @ApiProperty({
    type: () => [Exhibit],
    description: 'Список експонатів добавлених користувачами',
  })
  exhibits: Exhibit[];
}
