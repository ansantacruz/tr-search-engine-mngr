import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as database from '../../src/database/database';
import MotorcycleAccessoriesDataSource from '../../src/datasource/MotorcycleAccessoriesDataSource';
import { IProducType } from '../../src/model/IProductType';
import { ICategory } from '../../src/model/ICategory';
import { ITypeOfAccesories } from '../../src/model/ITypeOfAccesories';
import { IAccesoryBrand } from '../../src/model/IAccesoryBrand';

chai.use(chaiHttp);
chai.should();


const RESOLVE_RESPONSE_ACCESORIE_TYPE = [
    {
        'accesorieId': '1',
        'accesorieName': '',
        'logo': ''
    }
] as ITypeOfAccesories [];

const RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE = [{
    'brandName': '1',
    'brandId': 1,
} ] as IAccesoryBrand [];

describe('MotorcycleAccessoriesDataSource', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getTypeOfAccesories 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_ACCESORIE_TYPE);
        });
        MotorcycleAccessoriesDataSource.getTypeOfAccesories()
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].accesorieId).equal('1');
                done();
            });
    });

    it('getProductsTypes 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        MotorcycleAccessoriesDataSource.getTypeOfAccesories()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-TYPE-OF-ACCESORIES-404-DB');
                done();
            });
    });

    it('getProductsTypes 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        MotorcycleAccessoriesDataSource.getTypeOfAccesories()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-TYPE-OF-ACCESORIES');
                done();
            });
    });

    it('getBrandsOfSparePartsByType 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE);
        });
        MotorcycleAccessoriesDataSource.getBrandsOfSparePartsByType(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].brandName).equal('1');
                done();
            });
    });

    it('getBrandsOfSparePartsByType 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        MotorcycleAccessoriesDataSource.getBrandsOfSparePartsByType(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-ACCESORY-BRANDS-404-DB');
                done();
            });
    });

    it('getBrandsOfSparePartsByType 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        MotorcycleAccessoriesDataSource.getBrandsOfSparePartsByType(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-ACCESORY-BRANDS');
                done();
            });
    });
});
