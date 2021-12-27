import { Injectable, Query } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ConnectionArgs } from 'src/page/connection.args.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.prisma.customer.create({ data: createCustomerDto });
  }

  /**
   * TODO: Cursor기반의 Pagination을 좀더 스터디 후 완성시켜야 한다.
   * 커서 기반의 페이지네이션은 첫번째 페이지를 조회한 이후 계속해서 커서를
   * 클라이언트 측에서 관리한다.
   *
   * 따라서 cursor, totalPage, 등 페이지네이션에 사용되는
   * 필수 정보들을 함께 넘겨주어야 한다.
   * 어떤 정보들을 통상적으로 넘기는지 확인하고 데이터셋을 만들자.
   *
   * @param connectionArgs
   * @returns
   */
  async findAll(connectionArgs: ConnectionArgs) {
    const customers = await this.prisma.$queryRaw(
      Prisma.sql`
        SELECT * FROM customer 
        WHERE customer_id <= ${connectionArgs.after}
        ORDER BY customer_id DESC
        LIMIT ${connectionArgs.first};
      `,
    );

    return customers;
  }

  // findAll(connectionArgs: ConnectionArgs) {
  //   return this.prisma.customer.findMany({
  //     take: connectionArgs.first,
  //     // skip: connectionArgs.after ? 1 : 0,
  //     where: { active: true },
  //     orderBy: {
  //       customerId: 'desc',
  //     },
  //     cursor: { customerId: connectionArgs.after },
  //   });
  // }

  findOne(id: number) {
    return this.prisma.customer.findUnique({ where: { customerId: id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return this.prisma.customer.update({
      where: { customerId: id },
      data: updateCustomerDto,
    });
  }

  remove(id: number) {
    return this.prisma.customer.delete({ where: { customerId: id } });
  }

  findDrafts() {
    return this.prisma.customer.findMany({ where: { active: false } });
  }
}
