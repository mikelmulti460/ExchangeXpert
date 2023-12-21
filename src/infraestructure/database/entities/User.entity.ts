import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'user_id',
  })
  userId: number;

  @Column({
    name: 'username',
  })
  username: string;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'password',
  })
  password: string;
}
