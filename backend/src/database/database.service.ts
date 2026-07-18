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
      await this.ensurePlayersTable();
      await this.seedPlayers();
    } catch (error) {
      console.error('xxx Failed to connect to PostgreSQL xxx');
      console.error(error);
    }
  }

  async query(sql: string, params: any[] = []): Promise<QueryResult> {
    const result = await this.client.query(sql, params);

    console.log('SQL finished');

    return result;
  }

  private async ensurePlayersTable() {
    await this.query(`
      CREATE TABLE IF NOT EXISTS players (
        id SERIAL PRIMARY KEY,
        telegram_id VARCHAR(64) UNIQUE NOT NULL,
        username VARCHAR(255),
        total_score INTEGER DEFAULT 0
      );
    `);
  }

  private async seedPlayers() {
    await this.query(
      `
        INSERT INTO players (telegram_id, username)
        VALUES
          ($1, $2),
          ($3, $4),
          ($5, $6),
          ($7, $8),
          ($9, $10),
          ($11, $12),
          ($13, $14),
          ($15, $16),
          ($17, $18),
          ($19, $20)
        ON CONFLICT (telegram_id) DO NOTHING;
      `,
      [
        '981230451',
        'alex_house',
        '981230452',
        'mira_star',
        '981230453',
        'denis_game',
        '981230454',
        'lena_pixel',
        '981230455',
        'igor_tap',
        '981230456',
        'nika_run',
        '981230457',
        'roma_win',
        '981230458',
        'olga_score',
        '981230459',
        'max_bonus',
        '981230460',
        'tanya_level',
      ],
    );
  }
}
