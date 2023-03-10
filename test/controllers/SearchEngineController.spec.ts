import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import config from '../../src/config';
import { SparePartsService } from '../../src/services/SparePartsService';
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

describe('SparePartsController', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should resolve SparePartsController', (done) => {
        sinon.replace(
            SparePartsService,
            'getMotorcycleBrand',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-motorcycles-brands')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

      it('should reject SparePartsController', (done) => {
        sinon.replace(
            SparePartsService,
            'getMotorcycleBrand',
          (): Promise<any> => {
            return Promise.reject(REJECT_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-motorcycles-brands')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });


      it('should resolve SparePartsController', (done) => {
        sinon.replace(
            SparePartsService,
            'getMotorcyclebyBrand',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-motorcycles-by-brand/1')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

      it('should reject SparePartsController', (done) => {
        sinon.replace(
            SparePartsService,
            'getMotorcyclebyBrand',
          (): Promise<any> => {
            return Promise.reject(REJECT_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-motorcycles-by-brand/1')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });

      it('should resolve SparePartsController 1', (done) => {
        sinon.replace(
            SparePartsService,
            'getSapareParts',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-spare-parts/1/1')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

      it('should reject SparePartsController 1', (done) => {
        sinon.replace(
            SparePartsService,
            'getSapareParts',
          (): Promise<any> => {
            return Promise.reject(REJECT_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/motorcycles/get-spare-parts/1/1')
          .end((err, response) => {
            expect(response.status).to.equals(500);
            done();
          });
      });

});