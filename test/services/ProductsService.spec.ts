import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { ICategory } from '../../src/model/ICategory';
import { IError } from '../../src/model/IError';
import { IProducType } from '../../src/model/IProductType';
import { ProductsService } from '../../src/services/ProductsService';



chai.use(chaiHttp);
chai.should();
const mockExpressRequest = require('mock-express-request');

const RESOLVE_RESPONSE_PPRODUCT_TYPE = [{
   "idProductType": 1,
   "productName": "Bogota",
   "productLogo": '1'
} ] as IProducType [];

const RESOLVE_RESPONSE_CATEGORY = [{
   "categoryTypeId": 1,
   "categoryTypeName": "Bogota",
   "categoryLogo": '1'
} ] as ICategory [];

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

describe('ProductsService', () => {


   afterEach(() => {
      sinon.restore();
   });

   it('ProductsService getSearchConfig resolve', () => {

      sinon.replace(ProductsService, 'getProductsTypes', (): Promise<IProducType[]> => {
      return Promise.resolve(RESOLVE_RESPONSE_PPRODUCT_TYPE);
      });

      ProductsService.getProductsTypes()
      .then((res) => {
         expect(res[0].idProductType).equal(1);
      });
   });

   it('ProductsService getSearchConfig reject', () => {

      sinon.replace(ProductsService, 'getProductsTypes', (): Promise<IProducType[]> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      ProductsService.getProductsTypes()
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });

   it('ProductsService getCategoryByProductTypes resolve', () => {

      sinon.replace(ProductsService, 'getCategoryByProductTypes', (): Promise<ICategory[]> => {
      return Promise.resolve(RESOLVE_RESPONSE_CATEGORY);
      });

      ProductsService.getCategoryByProductTypes(1)
      .then((res) => {
         expect(res[0].categoryTypeId).equal(1);
      });
   });

   it('ProductsService getCategoryByProductTypes reject', () => {

      sinon.replace(ProductsService, 'getCategoryByProductTypes', (): Promise<ICategory[]> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      ProductsService.getCategoryByProductTypes(1)
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });
});

