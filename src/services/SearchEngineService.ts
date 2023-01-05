import debugLib from 'debug';
import SearchConfigDataSource from '../datasource/SearchConfigDataSource';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:SearchEngineService');


export class SearchEngineService {

    public static async getSearchConfig(): Promise<ISearchConfig[]> {
     try {
        const response =  await SearchConfigDataSource.getSearchConfig();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }
}