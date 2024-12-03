import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';
import { User } from 'src/user/entity/user.entity';

@Entity('exhibits')
export class Exhibit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  imagePath: string;

  @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
  @JoinColumn({ name: 'userId' })
  @Expose()
  user: User;

  @Column()
  userId: number;
}
