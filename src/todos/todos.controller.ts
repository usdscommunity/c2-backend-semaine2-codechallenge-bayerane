import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { Priority, Todo } from './entities/todo.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('todos')
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiResponse({
    status: 201,
    description: 'La tâche a été créée avec succès.',
    type: Todo,
  })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  create(@Body() createTodoDto: CreateTodoDto): Todo {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Récupérer toutes les tâches avec filtres optionnels',
  })
  @ApiQuery({ name: 'priority', enum: Priority, required: false })
  @ApiQuery({ name: 'tag', type: String, required: false })
  @ApiQuery({ name: 'isFavorite', type: Boolean, required: false })
  @ApiQuery({ name: 'search', type: String, required: false })
  @ApiResponse({
    status: 200,
    description: 'Liste des tâches récupérée avec succès.',
    type: [Todo],
  })
  findAll(@Query() filters: FilterTodoDto): Todo[] {
    return this.todosService.findAll(filters);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obtenir les statistiques des tâches' })
  @ApiResponse({
    status: 200,
    description: 'Statistiques récupérées avec succès.',
  })
  getStats() {
    return this.todosService.getStats();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par son ID' })
  @ApiResponse({
    status: 200,
    description: 'Tâche trouvée.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Tâche introuvable.' })
  findOne(@Param('id') id: string): Todo {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiResponse({
    status: 200,
    description: 'La tâche a été mise à jour avec succès.',
    type: Todo,
  })
  @ApiResponse({ status: 404, description: 'Tâche introuvable.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Todo {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiResponse({ status: 204, description: 'Tâche supprimée avec succès.' })
  @ApiResponse({ status: 404, description: 'Tâche introuvable.' })
  remove(@Param('id') id: string): void {
    return this.todosService.remove(id);
  }
}
