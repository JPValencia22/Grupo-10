import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Maestro} from '../models';
import {MaestroRepository} from '../repositories';

export class MaestroController {
  constructor(
    @repository(MaestroRepository)
    public maestroRepository : MaestroRepository,
  ) {}

  @post('/maestros')
  @response(200, {
    description: 'Maestro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Maestro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestro, {
            title: 'NewMaestro',
            exclude: ['id'],
          }),
        },
      },
    })
    maestro: Omit<Maestro, 'id'>,
  ): Promise<Maestro> {
    return this.maestroRepository.create(maestro);
  }

  @get('/maestros/count')
  @response(200, {
    description: 'Maestro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Maestro) where?: Where<Maestro>,
  ): Promise<Count> {
    return this.maestroRepository.count(where);
  }

  @get('/maestros')
  @response(200, {
    description: 'Array of Maestro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Maestro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Maestro) filter?: Filter<Maestro>,
  ): Promise<Maestro[]> {
    return this.maestroRepository.find(filter);
  }

  @patch('/maestros')
  @response(200, {
    description: 'Maestro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestro, {partial: true}),
        },
      },
    })
    maestro: Maestro,
    @param.where(Maestro) where?: Where<Maestro>,
  ): Promise<Count> {
    return this.maestroRepository.updateAll(maestro, where);
  }

  @get('/maestros/{id}')
  @response(200, {
    description: 'Maestro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Maestro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Maestro, {exclude: 'where'}) filter?: FilterExcludingWhere<Maestro>
  ): Promise<Maestro> {
    return this.maestroRepository.findById(id, filter);
  }

  @patch('/maestros/{id}')
  @response(204, {
    description: 'Maestro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Maestro, {partial: true}),
        },
      },
    })
    maestro: Maestro,
  ): Promise<void> {
    await this.maestroRepository.updateById(id, maestro);
  }

  @put('/maestros/{id}')
  @response(204, {
    description: 'Maestro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() maestro: Maestro,
  ): Promise<void> {
    await this.maestroRepository.replaceById(id, maestro);
  }

  @del('/maestros/{id}')
  @response(204, {
    description: 'Maestro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.maestroRepository.deleteById(id);
  }
}
