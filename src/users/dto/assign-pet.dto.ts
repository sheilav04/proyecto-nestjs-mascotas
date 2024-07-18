import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { PETS } from '../../common/constants/global.constants';

export class AssignPetDto {
  @IsNumber()
  @Min(1)
  @Max(PETS.length)
  petId: number;

  @IsString()
  @MinLength(5)
  @MaxLength(10)
  userName: string;
}
