import debugLib from 'debug';
import MotorcycleAccessoriesDataSource from '../datasource/MotorcycleAccessoriesDataSource';
import { IAccesoryBrand } from '../model/IAccesoryBrand';
import { ITypeOfAccesories } from '../model/ITypeOfAccesories';

const debug = debugLib('tc:MotorcycleAccessoriesService');


export class MotorcycleAccessoriesService {

    public static async getBrandsByCategory(category: number): Promise<any> {
      try {
         const response =  await MotorcycleAccessoriesDataSource.getBrandsByCategory(category);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain brands for an category %s ', err);
         return Promise.reject(err);
      }
    }

    public static async getProductsByBrand(productCategory: number, brand: number): Promise<any> {
      try {
         const response =  await MotorcycleAccessoriesDataSource.getProductsByBrand(productCategory, brand);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to product by brand and category  %s ', err);
         return Promise.reject(err);
      }
    }


}