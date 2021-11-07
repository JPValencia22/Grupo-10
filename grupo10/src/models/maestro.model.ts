import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Colegio} from './colegio.model';

@model()
export class Maestro extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  salario: string;

  @belongsTo(() => Colegio)
  colegioId: string;

  constructor(data?: Partial<Maestro>) {
    super(data);
  }
}

export interface MaestroRelations {
  // describe navigational properties here
}

export type MaestroWithRelations = Maestro & MaestroRelations;
