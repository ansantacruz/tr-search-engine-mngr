import debugLib from 'debug';
import SparePartsDataSource from '../datasource/SparePartsDataSource';

const debug = debugLib('tc:SparePartsService');


export class SparePartsService {

    public static async getMotorcycleBrand(): Promise<any> {
     try {
        const response =  await SparePartsDataSource.getMotorcycleBrand();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain motorcycle brands %s ', err);
        return Promise.reject(err);
     }
    }

    public static async getMotorcyclebyBrand(brand:number): Promise<any> {
      try {
         const response =  await SparePartsDataSource.getMotorcyclebyBrand(brand);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain motorcycle brands %s ', err);
         return Promise.reject(err);
      }
     }
}
