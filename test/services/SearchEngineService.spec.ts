import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import config from '../../src/config';
import { SearchEngineService } from '../../src/services/SearchEngineService';
import { ISearchConfig } from '../../src/model/ISearchConfig';
import SearchConfigDataSource from '../../src/datasource/SearchConfigDataSource';
import { IError } from '../../src/model/IError';



chai.use(chaiHttp);
chai.should();
const mockExpressRequest = require('mock-express-request');

const RESOLVE_RESPONSE = {
   "id": 1,
   "descripcion": "Bogota",
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

describe('SearchEngineService', () => {


   afterEach(() => {
      sinon.restore();
   });

   it('SearchEngineService getSearchConfig resolve', () => {

      sinon.replace(SearchConfigDataSource, 'getSearchConfig', (): Promise<ISearchConfig> => {
      return Promise.resolve(RESOLVE_RESPONSE);
      });

      SearchEngineService.getSearchConfig()
      .then((res) => {
         expect(res.descripcion).equal('Bogota');
      });
   });

   it('SearchEngineService getSearchConfig reject', () => {

      sinon.replace(SearchConfigDataSource, 'getSearchConfig', (): Promise<any> => {
      return Promise.reject(REJECT_RESPONSE);
      });

      SearchEngineService.getSearchConfig()
      .catch((err) => {
         expect(err.Status.StatusCode).equal(404);
      });
   });
});

