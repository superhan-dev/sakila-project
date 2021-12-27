import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @ApiProperty()
  storeId: number;

  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsOptional()
  @MaxLength(50)
  @ApiProperty({ required: false })
  email?: string;

  @IsNotEmpty()
  @ApiProperty()
  addressId: number;

  @IsNotEmpty()
  @ApiProperty()
  active: boolean;

  @IsNotEmpty()
  @ApiProperty()
  createDate: Date;

  @IsNotEmpty()
  @ApiProperty({ default: true })
  lastUpdate: Date;
}
