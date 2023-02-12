import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import * as database from '../../src/database/database';
import SparePartsDataSource from '../../src/datasource/SparePartsDataSource';
import { IMotorcycle } from '../../src/model/IMotorcycle';
import { IProduct } from '../../src/model/IProduct';

chai.use(chaiHttp);
chai.should();


const RESOLVE_RESPONSE = [{
    "id": 1,
    "marca": "Bogota",
    "estado": 1
} ]as ISearchConfig[];

const RESOLVE_RESPONSe_PRODUCT = [{
    "productId": 1,
    "productDescription": "Bogota",
    "logo": ""
} ]as IProduct[];

const RESOLVE_RESPONSE_MOTORCYCLE = [{
    "motorcycleId": 1,
    "motorcycleName": "Bogota",
    "motorcycleType": "test",
    "logo": "string"
} ]as IMotorcycle[];

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
                expect(res[0].marca).equal('Bogota');
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
            return Promise.resolve(RESOLVE_RESPONSE_MOTORCYCLE);
        });
        SparePartsDataSource.getMotorcyclebyBrand(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].motorcycleName).equal('Bogota');
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

    it('getSapareParts 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSe_PRODUCT);
        });
        SparePartsDataSource.getSapareParts(1,1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].productDescription).equal('Bogota');
                done();
            });
    });

    it('getSapareParts 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        SparePartsDataSource.getSapareParts(1,1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-MOTORCYCLE-BY_BRAND-404-DB');
                done();
            });
    });

    it('getSapareParts 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        SparePartsDataSource.getSapareParts(1,1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-MOTORCYCLE-BY_BRAND');
                done();
            });
    });
});
