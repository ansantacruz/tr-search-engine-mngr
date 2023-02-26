import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { IProduct } from '../model/IProduct';

const debug = debugLib('tc:MotorcycleAccessoriesDataSource');
export default class MotorcycleAccessoriesDataSource {


    public static readonly getBrandsByCategory = async (category: number): Promise<any> => {
        debug('Start the search of brand for an category');
        try {
            const result = await executeSQL(
                `SELECT DISTINCTROW ma.mpr_descripcion as brand
                FROM
                    tr_data_base.producto_categoria pc
                    INNER JOIN tr_data_base.producto p
                    ON p.pro_id = pc.pca_producto
                    INNER JOIN tr_data_base.marca_producto ma
                    ON p.pro_marca = ma.mpr_id
                where pc.pca_tipoCategoria =$category`,
                QueryTypes.SELECT,
                { category }
            );
            if (result.length > 0) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyGetTypeOfAccesoriesError = {
                    CodeError: 'SELECT-SEARCH-BRANDS-BY-CATEGORY-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyGetTypeOfAccesoriesError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-BRANDS-BY-CATEGORY', Reason: err });
        }
    }

    public static readonly getProductsByBrand = async (productCategory: number, brand: number): Promise<IProduct[]> => {
        debug('Start the search of products for an category and brand');
        try {
            const result = await executeSQL(
                `SELECT
                    p.pro_id as productId,
                    p.pro_descripcion as productDescription,
                    pi.pi_imagen as logo
                FROM
                    tr_data_base.producto_categoria pc
                    INNER JOIN tr_data_base.producto p
                    ON p.pro_id = pc.pca_producto
                    INNER JOIN tr_data_base.marca_producto ma
                    ON p.pro_marca = ma.mpr_id
                    INNER JOIN tr_data_base.producto_imagen pi
                    ON p.pro_id = pi.pi_producto
                WHERE pc.pca_tipoCategoria =$productCategory and ma.mpr_id =$brand;`,
                QueryTypes.SELECT,
                {productCategory, brand }
            );
            if (result.length > 0) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyGetTypeOfAccesoriesError = {
                    CodeError: 'SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyGetTypeOfAccesoriesError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCTS-BY-BRAND-AND-CATEGORY', Reason: err });
        }
    }


}