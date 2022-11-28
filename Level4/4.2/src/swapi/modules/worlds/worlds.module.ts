import { Module } from '@nestjs/common';
import { WorldsService } from './worlds.service';
import { WorldsController } from './worlds.controller';

@Module({
  controllers: [WorldsController],
  providers: [WorldsService]
})
export class WorldsModule {}
