import { IsString } from 'class-validator';

export class UnassignPetDTO {
  @IsString()
  userName: string;
}
