import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import config from '../../src/config';
import { ProductsService } from '../../src/services/ProductsService';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import { IError } from '../../src/model/IError';


chai.use(chaiHttp);
chai.should();
const apiPath = config.apiPath;
const expect = chai.expect;

const RESOLVE_RESPONSE = {
    "id": 1,
    "marca": "Bogota",
    "estado": 1
} as ISearchConfig;

const REJECT_RESPONSE = {
    "EndDt": "01/01/2023",
    "Status": {
        'CodeError': '-000-0',
        'ServerStatusCode':'404',
        'Severity': 'Error',
        'StatusCode': 404,
        'StatusDesc': 'NOT_FOUND'
    }
} as IError;

describe('ProductsController', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should resolve ProductsController', (done) => {
        sinon.replace(
            ProductsService,
            'getProductsTypes',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/products/get-types')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

      it('should reject ProductsController', (done) => {
        sinon.replace(
            ProductsService,
            'getProductsTypes',
          (): Promise<any> => {
            return Promise.reject(REJECT_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/products/get-types')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });


      it('should resolve ProductsController', (done) => {
        sinon.replace(
            ProductsService,
            'getCategoryByProductTypes',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/products/get-category-by-produc-type/1')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

      it('should reject ProductsController', (done) => {
        sinon.replace(
            ProductsService,
            'getCategoryByProductTypes',
          (): Promise<any> => {
            return Promise.reject(REJECT_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/products/get-category-by-produc-type/1')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });

});