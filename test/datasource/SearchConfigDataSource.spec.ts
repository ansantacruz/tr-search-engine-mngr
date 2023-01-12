import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import { IError } from '../../src/model/IError';
import * as database from '../../src/database/database';
import SparePartsDataSource from '../../src/datasource/SparePartsDataSource';

chai.use(chaiHttp);
chai.should();


const RESOLVE_RESPONSE = [{
    "id": 1,
    "descripcion": "Bogota",
    "estado": 1
} ]as ISearchConfig[];

describe('SparePartsDataSource', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should get approval info ', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
        });
        SparePartsDataSource.getMotorcycleBrand()
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].descripcion).equal('Bogota');
                done();
            });
    });

});