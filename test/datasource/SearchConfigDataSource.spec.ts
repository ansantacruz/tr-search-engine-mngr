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
        SparePartsDataSource.getSearchConfig()
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].descripcion).equal('Bogota');
                done();
            });
    });

    it('should get approval info  empty result', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(undefined);
        });
        SparePartsDataSource.getSearchConfig()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH_CONFIG-ENTITY-404-DB');
                done();
            });
    });

});