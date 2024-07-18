import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  name: string;

  @IsNumber()
  @Min(18)
  age: number;
}
