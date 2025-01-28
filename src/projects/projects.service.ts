import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from '../common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProjectsService extends PrismaClient implements OnModuleInit {

  private  readonly logger = new Logger(ProjectsService.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Projects database service connected');
  }

  create(createProjectDto: CreateProjectDto) {
    return this.project.create({
      data: createProjectDto,
    })
  }

  async findAll(queryDto: PaginationDto) {
    const { page, limit } = queryDto;
    const total = await this.project.count()
    const lastPage = Math.ceil(total / limit!);

    return {
      data: await this.project.findMany({
        skip: (page - 1) * limit!,
        take: limit,
        where: {
          available: true,
        }
      }),
      meta: {
        page,
        total,
        lastPage,
      }
    }
  }

  async findOne(id: number) {
    const project = await this.project.findFirst({
      where: { id, available: true },
    });

    if (!project) {
      throw new RpcException({
        message: `Project with id ${id} not found`,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    }
    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { id: __, ...data } = updateProjectDto;

    await this.findOne(id);

    return this.project.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.project.update({
      where: { id },
      data: {
        available: false,
      },
    });
  }
}
