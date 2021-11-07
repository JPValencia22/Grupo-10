import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Colegio, ColegioRelations, Maestro} from '../models';
import {MaestroRepository} from './maestro.repository';

export class ColegioRepository extends DefaultCrudRepository<
  Colegio,
  typeof Colegio.prototype.id,
  ColegioRelations
> {

  public readonly maestros: HasManyRepositoryFactory<Maestro, typeof Colegio.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('MaestroRepository') protected maestroRepositoryGetter: Getter<MaestroRepository>,
  ) {
    super(Colegio, dataSource);
    this.maestros = this.createHasManyRepositoryFactoryFor('maestros', maestroRepositoryGetter,);
    this.registerInclusionResolver('maestros', this.maestros.inclusionResolver);
  }
}
