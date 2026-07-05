import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('players')
export class PlayersController {

  constructor(
    private readonly playersService: PlayersService,
  ) {}

    @Get()
async getPlayers() {
  return this.playersService.getPlayers();
}
    @Get(':telegramId')
    async getPlayer(
        @Param('telegramId') telegramId: string,
    )   {
        return this.playersService.getPlayer(telegramId);
    }
    @Post()
    async createPlayer(
    @Body() body: any,
    ) {
    return this.playersService.createPlayer(body);
}
}