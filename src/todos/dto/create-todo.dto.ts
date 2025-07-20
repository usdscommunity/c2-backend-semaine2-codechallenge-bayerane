import { ApiProperty } from '@nestjs/swagger';
import { Priority } from '../entities/todo.entity';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({
    description: 'Titre de la tâche',
    example: 'Finir le projet NestJS',
  })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Description détaillée de la tâche',
    example: `Implémenter l'API REST avec tous les endpoints CRUD`,
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Priorité de la tâche',
    enum: Priority,
    default: Priority.MEDIUM,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({
    description: 'Tags associés à la tâche',
    example: ['travail', 'urgent'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({
    description: 'Marquer comme favori',
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isFavorite?: boolean;
}
