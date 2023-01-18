import debugLib from 'debug';
import MotorcycleAccessoriesDataSource from '../datasource/MotorcycleAccessoriesDataSource';
import { IAccesoryBrand } from '../model/IAccesoryBrand';
import { ITypeOfAccesories } from '../model/ITypeOfAccesories';

const debug = debugLib('tc:MotorcycleAccessoriesService');


export class MotorcycleAccessoriesService {

    public static async getTypeOfAccesories(): Promise<ITypeOfAccesories[]> {
      try {
         const response =  await MotorcycleAccessoriesDataSource.getTypeOfAccesories();
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain acesories types %s ', err);
         return Promise.reject(err);
      }
    }

    public static async getBrandsOfSparePartsByType (accesory: number ): Promise<IAccesoryBrand[]> {
      try {
         const response =  await MotorcycleAccessoriesDataSource.getBrandsOfSparePartsByType(accesory);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain acesories types %s ', err);
         return Promise.reject(err);
      }
    }
}