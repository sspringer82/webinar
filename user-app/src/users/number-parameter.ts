import { IsNumberString } from 'class-validator';

export class NumberParameter {
  @IsNumberString()
  id: string;
}
