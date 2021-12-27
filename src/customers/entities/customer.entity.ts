import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntity {
  @ApiProperty()
  customerId: number;
  @ApiProperty()
  storeId: number;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty({ required: false })
  email?: string;
  @ApiProperty()
  addressId: number;
  @ApiProperty()
  active: boolean;
  @ApiProperty()
  createDate: Date;
  @ApiProperty()
  lastUpdate: Date;
}
