import chai, { assert, expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import * as database from '../../src/database/database';
import ProductsDataSource from '../../src/datasource/ProductsDataSource';
import { IProducType } from '../../src/model/IProductType';
import { ICategory } from '../../src/model/ICategory';

chai.use(chaiHttp);
chai.should();


const RESOLVE_RESPONSE_PRODUCT_TYPE = [
    {
        'idProductType': 1,
        'productName': '',
        'productLogo': ''
    }
] as IProducType [];

const RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE = [{
    'categoryTypeId': 1,
    'categoryTypeName': '',
    'categoryLogo': ''
} ] as ICategory [];

describe('ProductsDataSource', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('getProductsTypes 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE_PRODUCT_TYPE);
        });
        ProductsDataSource.getProductsTypes()
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].idProductType).equal(1);
                done();
            });
    });

    it('getProductsTypes 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        ProductsDataSource.getProductsTypes()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.CodeError).equal('SELECT-SEARCH-PRODUCT-TYPES-404-DB');
                done();
            });
    });

    it('getProductsTypes 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        ProductsDataSource.getProductsTypes()
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-PRODUCT-TYPES');
                done();
            });
    });

    it('getCategoryByProductTypes 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE);
        });
        ProductsDataSource.getCategoryByProductTypes(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].categoryTypeId).equal(1);
                done();
            });
    });

    it('getCategoryByProductTypes 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        ProductsDataSource.getCategoryByProductTypes(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-PRODUCT-TYPES');
                done();
            });
    });

    it('getCategoryByProductTypes 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        ProductsDataSource.getCategoryByProductTypes(1)
            .catch((res) => {
                assert.isDefined(res);
                expect(res.CodeError).equal('SELECT-SEARCH-CATEGORY_BY_PRODUCT_TYPE-404-DB');
                done();
            });
    });

    it('getElementsByCategory 200', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSECATEGORY_BY__PRODUCT_TYPE);
        });
        ProductsDataSource.getElementsByCategory(1)
            .then((res) => {
                assert.isDefined(res);
                expect(res[0].categoryTypeId).equal(1);
                done();
            });
    });

    it('getElementsByCategory 500', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.reject(undefined);
        });
        ProductsDataSource.getElementsByCategory(1)
            .catch((err) => {
                assert.isDefined(err);
                expect(err.Code).equal('SELECT-SEARCH-ELEMTS-BY-CATEGORY');
                done();
            });
    });

    it('getElementsByCategory 404', (done) => {
        sinon.replace(database, 'executeSQL', (): Promise<any> => {
            return Promise.resolve([]);
        });
        ProductsDataSource.getElementsByCategory(1)
            .catch((res) => {
                assert.isDefined(res);
                expect(res.CodeError).equal('SELECT-SEARCH-ELEMENTS-BY-CATEGORTY-404-DB');
                done();
            });
    });
});
