import debugLib from 'debug';
import SparePartsDataSource from '../datasource/ModelMotorcycleDataSource';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:ModelMotorcycleService');


export class ModelMotorcycleService {

    public static async getModelMotorcycle(): Promise<any> {
     try {
        const response =  await ModelMotorcycleDataSource.getModelMotorcycle();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain the search configuration %s ', err);
        return Promise.reject(err);
     }
    }
}