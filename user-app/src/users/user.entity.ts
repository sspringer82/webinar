import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'the unique id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Claudia', description: 'First name of the user' })
  @Column()
  firstname: string;

  @ApiProperty({ example: 'Müller', description: 'Last name of the user' })
  @Column()
  lastname: string;

  @ApiProperty({ example: 'cmueller', description: 'username' })
  @Column()
  username: string;

  @ApiProperty({ example: 'topSecret', description: 'password' })
  @Column()
  password: string;
}
