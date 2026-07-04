import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class PlayersService {

  constructor(
    private readonly databaseService: DatabaseService,
  ) {}

  async getPlayers() {
    const result = await this.databaseService.query(
      'SELECT * FROM players;',
    );

    return result.rows;
  }
  async getPlayer(telegramId: string) {
  const result = await this.databaseService.query(
    'SELECT * FROM players WHERE telegram_id = $1;',
    [telegramId],
  );

  return result.rows[0];
}
    async createPlayer(body: any) {

  const result = await this.databaseService.query(
    `
    INSERT INTO players (telegram_id, username)
    VALUES ($1, $2)
    RETURNING *;
    `,
    [
      body.telegram_id,
      body.username,
    ],
  );

  return result.rows[0];
}
}