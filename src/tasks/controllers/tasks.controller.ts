import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessLevel } from '../../auth/decorators/access-level.decorator';
import { AccessLevelGuard } from '../../auth/guards/access-level.guard';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { RolesGuard } from '../../auth/guards/role.guard';
import { TasksDTO } from '../dto/tasks.dto';
import { TasksService } from '../services/tasks.service';
@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard, RolesGuard, AccessLevelGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiParam({
    name: 'projectId',
  })
  @ApiHeader({
    name: 'tasks_token',
  })
  @AccessLevel('DEVELOPER')
  @Post('create/:projectId')
  public async createTask(
    @Body() body: TasksDTO,
    @Param('projectId') projectId: string,
  ) {
    return this.tasksService.createTask(body, projectId);
  }
}
