
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import SparePartsDataSource from '../../src/datasource/SparePartsDataSource';
import { IError } from '../../src/model/IError';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import { SparePartsService } from '../../src/services/SparePartsService';
import { IProduct } from '../../src/model/IProduct';



chai.use(chaiHttp);
chai.should();
const mockExpressRequest = require('mock-express-request');

const RESOLVE_RESPONSE = [{
   "id": 1,
   "marca": "Bogota",
   "estado": 1
} ] as ISearchConfig [];

const RESOLVE_RESPONSE_PRODUCT = [{
   "productId": 1,
   "productDescription": "Bogota",
   "logo": "1"
} ] as IProduct [];

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

describe('SparePartsService', () => {


   afterEach(() => {
      sinon.restore();
   });

   it('SparePartsService getSearchConfig resolve', () => {

      sinon.replace(SparePartsDataSource, 'getMotorcycleBrand', (): Promise<ISearchConfig[]> => {
      return Promise.resolve(RESOLVE_RESPONSE);
      });

      SparePartsService.getMotorcycleBrand()
      .then((res) => {
         expect(res[0].marca).equal('Bogota');
      });
   });

   it('SparePartsService getSearchConfig reject', () => {

      sinon.replace(SparePartsDataSource, 'getMotorcycleBrand', (): Promise<any> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      SparePartsService.getMotorcycleBrand()
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });

   // it('SparePartsService getSearchConfig resolve', () => {

   //    sinon.replace(SparePartsDataSource, 'getMotorcyclebyBrand', (): Promise<ISearchConfig[]> => {
   //    return Promise.resolve(RESOLVE_RESPONSE);
   //    });

   //    SparePartsService.getMotorcyclebyBrand(1)
   //    .then((res) => {
   //       expect(res[0].marca).equal('Bogota');
   //    });
   // });

   it('SparePartsService getSearchConfig reject', () => {

      sinon.replace(SparePartsDataSource, 'getMotorcyclebyBrand', (): Promise<any> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      SparePartsService.getMotorcyclebyBrand(1)
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });

   it('getSapareParts getSearchConfig resolve', () => {

      sinon.replace(SparePartsDataSource, 'getSapareParts', (): Promise<IProduct[]> => {
      return Promise.resolve(RESOLVE_RESPONSE_PRODUCT);
      });

      SparePartsService.getSapareParts(1,1)
      .then((res) => {
         expect(res[0].productDescription).equal('Bogota');
      });
   });

   it('SparePartsService getSapareParts reject', () => {

      sinon.replace(SparePartsDataSource, 'getSapareParts', (): Promise<any> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      SparePartsService.getSapareParts(1,1)
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });
});

