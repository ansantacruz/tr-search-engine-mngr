import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as database from '../../src/database/database';
import MotorcycleAccessoriesDataSource from '../../src/datasource/MotorcycleAccessoriesDataSource';
import { ITypeOfAccesories } from '../../src/model/ITypeOfAccesories';
import { IProduct } from '../../src/model/IProduct';

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
    "productId": 1,
    "productDescription": "string",
    "logo": "string"
} ] as IProduct [];

describe('MotorcycleAccessoriesDataSource', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getBrandsByCategory 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_ACCESORIE_TYPE);
        });
        MotorcycleAccessoriesDataSource.getBrandsByCategory(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].accesorieId).equal('1');
                done();
            });
    });

    it('getBrandsByCategory 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        MotorcycleAccessoriesDataSource.getBrandsByCategory(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-BRANDS-BY-CATEGORY-404-DB');
                done();
            });
    });

    it('getBrandsByCategory 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        MotorcycleAccessoriesDataSource.getBrandsByCategory(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-BRANDS-BY-CATEGORY');
                done();
            });
    });

    it('getProductsByBrand 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE);
        });
        MotorcycleAccessoriesDataSource.getProductsByBrand(1,1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].productDescription).equal('string');
                done();
            });
    });

    it('getProductsByBrand 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        MotorcycleAccessoriesDataSource.getProductsByBrand(1,1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY-404-DB');
                done();
            });
    });

    it('getProductsByBrand 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        MotorcycleAccessoriesDataSource.getProductsByBrand(1,1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY');
                done();
            });
    });
});
