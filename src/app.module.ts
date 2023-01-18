// import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: true,
    // }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [User],
      extra: {
        ssl: { rejectUnauthorized: false },
      },

      synchronize: true, //TODO: make this depend on environment, dangerous in production
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
