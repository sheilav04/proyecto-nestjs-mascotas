import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { DATABASE_PATH, PETS } from '../common/constants/global.constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async create(user: CreateUserDto) {
    const users: CreateUserDto[] = await this.findAll();
    users.push(user);
    await fs.writeFile(DATABASE_PATH, JSON.stringify(users));
  }

  async findAll(showPet?: boolean): Promise<UserDto[]> {
    const data = await fs.readFile(DATABASE_PATH);
    const users: UserDto[] = JSON.parse(data.toString());

    if (!showPet) return users;

    return users.map((user) => {
      const petId = user.petId;

      delete user.petId;

      if (!petId) return user;

      const pet = PETS.find((pet) => pet.id == petId);

      return { ...user, pet };
    });
  }

  async findOne(name: string) {
    const users = await this.findAll();

    const user = users.find((user) => user.name == name);

    if (!user) throw new ForbiddenException('mensaje hola');

    return user;
  }

  async update(name: string, user: UpdateUserDto) {
    const users = await this.findAll();
    const index = users.findIndex((user) => user.name == name);

    users[index] = { ...users[index], ...user };

    await fs.writeFile(DATABASE_PATH, JSON.stringify(users));
  }

  async remove(name: string) {
    const users = await this.findAll();
    const index = users.findIndex((user) => user.name == name);
    users.splice(index, 1);
    await fs.writeFile(DATABASE_PATH, JSON.stringify(users));
  }

  async assignPet(userName: string, petId: number) {
    const users = await this.findAll();

    if (users.some((user) => user.petId == petId))
      throw new BadRequestException(`La mascota #${petId} ya está asignada a otro usuario`);

    const index = users.findIndex((user) => user.name == userName);
    users[index] = { ...users[index], petId };

    await fs.writeFile(DATABASE_PATH, JSON.stringify(users));
  }

  async unassignPet(userName: string) {
    const users = await this.findAll();
    const index = users.findIndex((user) => user.name == userName);

    if (!users[index].petId) throw new BadRequestException(`El usuario ${userName} no tiene mascota asignada`);

    users[index] = { ...users[index], petId: undefined };

    await fs.writeFile(DATABASE_PATH, JSON.stringify(users));
  }
}
