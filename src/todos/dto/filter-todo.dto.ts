import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { Priority } from '../entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FilterTodoDto {
  @ApiProperty({
    description: 'Filtrer par priorité',
    enum: Priority,
    required: false,
  })
  @IsOptional()
  @IsEnum(Priority)
  priority?: Priority;

  @ApiProperty({
    description: 'Filtrer par tag',
    required: false,
  })
  @IsOptional()
  @IsString()
  tag?: string;

  @ApiProperty({
    description: 'Filtrer par favoris',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isFavorite?: boolean;

  @ApiProperty({
    description: 'Filtrer par etat de complétion',
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({
    description: 'Recherche par mot-clé dans titre ou description',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
