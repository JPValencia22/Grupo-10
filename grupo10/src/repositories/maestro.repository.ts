import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Maestro, MaestroRelations, Colegio} from '../models';
import {ColegioRepository} from './colegio.repository';

export class MaestroRepository extends DefaultCrudRepository<
  Maestro,
  typeof Maestro.prototype.id,
  MaestroRelations
> {

  public readonly colegio: BelongsToAccessor<Colegio, typeof Maestro.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ColegioRepository') protected colegioRepositoryGetter: Getter<ColegioRepository>,
  ) {
    super(Maestro, dataSource);
    this.colegio = this.createBelongsToAccessorFor('colegio', colegioRepositoryGetter,);
    this.registerInclusionResolver('colegio', this.colegio.inclusionResolver);
  }
}
