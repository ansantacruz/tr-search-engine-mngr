import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import config from '../../src/config';
import { IError } from '../../src/model/IError';
import { MotorcycleAccessoriesService } from '../../src/services/MotorcycleAccessoriesService';


chai.use(chaiHttp);
chai.should();
const apiPath = config.apiPath;
const expect = chai.expect;

const RESOLVE_RESPONSE_BRANDS = [
  {
    "brand": "ICON"
  }
];

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

describe('MotorcycleAccessoriesController', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should resolve et-brands-of-category', (done) => {
      sinon.replace(
        MotorcycleAccessoriesService,
          'getBrandsByCategory',
        (): Promise<any> => {
          return Promise.resolve(RESOLVE_RESPONSE_BRANDS);
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/accessories/get-brands-of-category/1')
        .end((err, response) => {
          expect(response.status).to.equals(200);
          done();
        });
    });

    it('should reject et-brands-of-category', (done) => {
      sinon.replace(
        MotorcycleAccessoriesService,
          'getBrandsByCategory',
        (): Promise<any> => {
          return Promise.reject({status:500});
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/accessories/get-brands-of-category/1')
        .end((err, response) => {
          expect(response.status).to.equals(500);
          done();
        });
    });


    it('should resolve get-propducts-by-brand', (done) => {
      sinon.replace(
        MotorcycleAccessoriesService,
          'getProductsByBrand',
        (): Promise<any> => {
          return Promise.resolve(RESOLVE_RESPONSE_BRANDS);
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/accessories/get-propducts-by-brand/1/1')
        .end((err, response) => {
          expect(response.status).to.equals(200);
          done();
        });
    });

    it('should reject get-propducts-by-brand', (done) => {
      sinon.replace(
        MotorcycleAccessoriesService,
          'getProductsByBrand',
        (): Promise<any> => {
          return Promise.reject({status:500});
        }
      );
      chai
        .request(app)
        .get(apiPath + '/V1/accessories/get-propducts-by-brand/1/1')
        .end((err, response) => {
          expect(response.status).to.equals(500);
          done();
        });
    });

});
