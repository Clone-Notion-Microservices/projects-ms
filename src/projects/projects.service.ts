import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProjectsService extends PrismaClient implements OnModuleInit {

  private  readonly logger = new Logger(ProjectsService.name);

  create(createProjectDto: CreateProjectDto) {
    return 'This action adds a new project';
  }

  findAll() {
    return `This action returns all projects`;
  }

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }

  onModuleInit(): any {
    this.$connect();
    this.logger.log('Projects database service connected');
  }
}
