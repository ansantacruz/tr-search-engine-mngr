import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../../src/app';
import config from '../../src/config';
import { SearchEngineService } from '../../src/services/SearchEngineService';
import { ISearchConfig } from '../../src/model/ISearchConfig';


chai.use(chaiHttp);
chai.should();
const apiPath = config.apiPath;
const expect = chai.expect;

const RESOLVE_RESPONSE = {
    "id": 1,
    "descripcion": "Bogota",
    "estado": 1
} as ISearchConfig;

describe('SearchEngineController', () => {
    afterEach(() => {
      sinon.restore();
    });

    it('should resolve Legalization Controller', (done) => {
        sinon.replace(
            SearchEngineService,
            'getSearchConfig',
          (): Promise<any> => {
            return Promise.resolve(RESOLVE_RESPONSE);
          }
        );
        chai
          .request(app)
          .get(apiPath + '/V1/search-config')
          .end((err, response) => {
            expect(response.status).to.equals(200);
            done();
          });
      });

});