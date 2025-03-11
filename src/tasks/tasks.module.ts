import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksRepository } from './tasks.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TasksRepository]),],
  controllers: [TasksController],
  providers: [TasksService,
    {
      provide: 'TasksRepository',
      useFactory: (dataSource: DataSource) => {
        return new TasksRepository(dataSource);
      },
      inject: [DataSource],
    },]
})
export class TasksModule {}
