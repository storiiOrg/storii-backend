// import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: true,
    // }),
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'storii.database.windows.net',
    //   port: 1433,
    //   username: 'CloudSA7ed77d60',
    //   password: 'SwordOfDoom+3',
    //   database: 'StoriiDb',
    //   entities: [],
    //   synchronize: true, //TODO: make this depend on environment, dangerous in production
    // }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// Server=tcp:storii.database.windows.net,1433;Initial Catalog=StoriiDb;Persist Security Info=False;User ID=CloudSA7ed77d60;Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
