import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from '../common';

@Controller()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern('createProject')
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern('findAllProjects')
  findAllProjects(queryDto: PaginationDto) {
    return this.projectsService.findAll(queryDto);
  }

  @MessagePattern('findOneProject')
  findOne(@Payload() id: number) {
    return this.projectsService.findOne(id);
  }

  @MessagePattern('updateProject')
  update(@Payload() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(updateProjectDto.id, updateProjectDto);
  }

  @MessagePattern('removeProject')
  remove(@Payload() id: number) {
    return this.projectsService.remove(id);
  }
}
