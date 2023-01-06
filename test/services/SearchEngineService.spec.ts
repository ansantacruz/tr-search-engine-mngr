import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import config from '../../src/config';
import { SparePartsService } from '../../src/services/SparePartsService';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import SparePartsDataSource from '../../src/datasource/SparePartsDataSource';
import { IError } from '../../src/model/IError';



chai.use(chaiHttp);
chai.should();
const mockExpressRequest = require('mock-express-request');

const RESOLVE_RESPONSE = [{
   "id": 1,
   "descripcion": "Bogota",
   "estado": 1
} ] as ISearchConfig [];

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

      sinon.replace(SparePartsDataSource, 'getSearchConfig', (): Promise<ISearchConfig[]> => {
      return Promise.resolve(RESOLVE_RESPONSE);
      });

      SparePartsService.getSearchConfig()
      .then((res) => {
         expect(res[0].descripcion).equal('Bogota');
      });
   });

   it('SparePartsService getSearchConfig reject', () => {

      sinon.replace(SparePartsDataSource, 'getSearchConfig', (): Promise<any> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      SparePartsService.getSearchConfig()
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });
});

