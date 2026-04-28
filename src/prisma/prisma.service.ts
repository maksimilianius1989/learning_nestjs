import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { appendFileSync } from 'fs';
import { requestContext } from 'src/common/request-context';

@Injectable()
export class PrismaService extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {

  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    super({
      adapter,
      log: [
        {
          emit: 'event',
          level: 'query',
        },
      ],
    });

    (this as any).$on('query', (e) => {
      const store = requestContext.getStore();
      const requestID = store?.requestId || 'no-request';
      const fileName = `logs/prisma-${requestID}.log`;

      const line = `
        [${new Date().toISOString()}]
        SQL: ${e.query}
        PARAMS: ${e.params}
        DURATION: ${e.duration}
        -------------------------
      `;

      appendFileSync(fileName, line);
    });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}