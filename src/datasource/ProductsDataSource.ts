import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { IProducType } from '../model/IProductType';
import { ICategory } from '../model/ICategory';

const debug = debugLib('tc:ProductsDataSource');

export default class ProductsDataSource {


    public static readonly getProductsTypes = async (): Promise<IProducType[]> => {
        debug('Starts the database query of the search products types');
        try {
            const result = await executeSQL(
                `SELECT
                    tp.tpr_id as idProductType,
                    tp.tpr_descripcion as productName,
                    tp.tpr_logo as productLogo
                FROM tr_data_base.tipo_producto tp
                WHERE tp.tpr_activo = 1;`,
                QueryTypes.SELECT,
                {}
                );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyError = {
                    CodeError: 'SELECT-SEARCH-PRODUCT-TYPES-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
        }
    }

    public static readonly getCategoryByProductTypes = async (producType: number): Promise<ICategory[]> => {
        debug('Starts the database query of the search products types');
        try {
            const result = await executeSQL(
                `SELECT
                    ta.tca_id as categoryTypeId,
                    ta.tca_descripcion as categoryTypeName,
                    ta.tca_logo as categoryLogo
                FROM tr_data_base.tipo_categoria ta
                INNER JOIN  tr_data_base.tipo_producto tp
                    ON ta.tca_tipo_producto = tp.tpr_id
                WHERE ta.tca_tipo_producto = $producType;  `,
                QueryTypes.SELECT,
                {producType}
                );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyError = {
                    CodeError: 'SELECT-SEARCH-PRODUCT-TYPES-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-PRODUCT-TYPES', Reason: err });
        }
    }
}