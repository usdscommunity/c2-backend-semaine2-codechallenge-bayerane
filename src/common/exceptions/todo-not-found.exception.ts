import { NotFoundException } from '@nestjs/common';

export class TodoNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Tâche avec l'ID ${id} non trouvée`);
  }
}
