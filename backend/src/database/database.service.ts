import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
});
  }

  async onModuleInit() {
    try {
      await this.client.connect();
        console.log('!!! Connected to PostgreSQL !!!');
        const result = await this.query('SELECT NOW();');
        console.log(result.rows);
    } catch (error) {
      console.error('xxx Failed to connect to PostgreSQL xxx');
      console.error(error);
    }
  }

  async query(sql: string, params: any[] = []): Promise<QueryResult> {
  console.log('Executing SQL:', sql);

  const result = await this.client.query(sql, params);

  console.log('SQL finished');

  return result;
}
}