import { GqlModuleOptions } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';

export async function getGraphQLConfig(): Promise<GqlModuleOptions> {
  return {
    driver: ApolloDriver,
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
  };
}
