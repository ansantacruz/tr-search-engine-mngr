import debugLib from 'debug';
import ProductsDataSource from '../datasource/ProductsDataSource';
import { ICategory } from '../model/ICategory';
import { IProducType } from '../model/IProductType';

const debug = debugLib('tc:ProductsService');


export class ProductsService {

    public static async getProductsTypes(): Promise<IProducType[]> {
     try {
        const response =  await ProductsDataSource.getProductsTypes();
        return Promise.resolve(response);
     } catch (err) {
        debug('Error trying to obtain products types- %s ', err);
        return Promise.reject(err);
     }
    }

    public static async getCategoryByProductTypes(producType: number): Promise<ICategory[]> {
      try {
         const response =  await ProductsDataSource.getCategoryByProductTypes(producType);
         return Promise.resolve(response);
      } catch (err) {
         debug('Error trying to obtain categiries by product type- %s ', err);
         return Promise.reject(err);
      }
     }
}
