import {Entity, model, property, hasMany} from '@loopback/repository';
import {Maestro} from './maestro.model';

@model()
export class Colegio extends Entity {
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
  nit: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  director: string;

  @hasMany(() => Maestro)
  maestros: Maestro[];

  constructor(data?: Partial<Colegio>) {
    super(data);
  }
}

export interface ColegioRelations {
  // describe navigational properties here
}

export type ColegioWithRelations = Colegio & ColegioRelations;
