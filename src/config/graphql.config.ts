import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { isDev } from 'src/utils/is-dev.utils';

export async function getGraphQLConfig(ConfigService: ConfigService): Promise<ApolloDriverConfig> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: isDev(ConfigService),
    context: ({ req, res }) => ({ req, res }),
  };
}
