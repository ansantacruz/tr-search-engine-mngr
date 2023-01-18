import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { ISearchConfig } from '../../src/model/ISearchConfig';
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

    it('getMotorcycleBrand 200', (done) => {
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

    it('getMotorcycleBrand 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        SparePartsDataSource.getMotorcycleBrand()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-MOTORCYCLE-BRANDS-404-DB');
                done();
            });
    });

    it('getMotorcycleBrand 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        SparePartsDataSource.getMotorcycleBrand()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-MOTORCYCLE-BRANDS');
                done();
            });
    });

    it('getMotorcyclebyBrand 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
        });
        SparePartsDataSource.getMotorcyclebyBrand(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].descripcion).equal('Bogota');
                done();
            });
    });

    it('getMotorcyclebyBrand 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        SparePartsDataSource.getMotorcyclebyBrand(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-MOTORCYCLE-BY_BRAND-404-DB');
                done();
            });
    });

    it('getMotorcyclebyBrand 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        SparePartsDataSource.getMotorcyclebyBrand(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-MOTORCYCLE-BY_BRAND');
                done();
            });
    });
});
