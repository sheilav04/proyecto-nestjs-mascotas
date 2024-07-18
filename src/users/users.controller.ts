import { Body, Controller, Delete, Get, Param, ParseBoolPipe, Patch, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AssignPetDto } from './dto/assign-pet.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UnassignPetDTO } from './dto/unassign-pet.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }

  @Get()
  findAll(@Query('showPet', ParseBoolPipe) showPet: boolean) {
    return this.usersService.findAll(showPet);
  }

  @Get(':name')
  findOne(@Param('name') name: string) {
    return this.usersService.findOne(name);
  }

  @Patch(':name')
  async update(@Param('name') name: string, @Body() user: UpdateUserDto, @Res() res: Response) {
    await this.usersService.update(name, user);
    res.sendStatus(204);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.usersService.remove(name);
  }

  @Post('/assign-pet')
  assignPet(@Body() { userName, petId }: AssignPetDto) {
    return this.usersService.assignPet(userName, petId);
  }

  @Post('/unassign-pet')
  unassignPet(@Body() { userName }: UnassignPetDTO) {
    return this.usersService.unassignPet(userName);
  }
}
