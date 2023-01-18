import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ITypeOfAccesories } from '../model/ITypeOfAccesories';
import { IAccesoryBrand } from '../model/IAccesoryBrand';

const debug = debugLib('tc:MotorcycleAccessoriesDataSource');

export default class MotorcycleAccessoriesDataSource {


    public static readonly getTypeOfAccesories = async (): Promise<ITypeOfAccesories[]> => {
        debug('Start the search for types of accessories');
        try {
            const result = await executeSQL(
                `SELECT
                    ta.tac_id as accesorieId,
                    ta.tac_descripcion as accesorieName,
                    ta.tac_logo as logo
                FROM tr_data_base.tipo_accesorio ta
                where ta.tac_estado = 1;`,
                QueryTypes.SELECT,
                {}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyGetTypeOfAccesoriesError = {
                    CodeError: 'SELECT-SEARCH-TYPE-OF-ACCESORIES-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyGetTypeOfAccesoriesError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-TYPE-OF-ACCESORIES', Reason: err });
        }
    }

    public static readonly getBrandsOfSparePartsByType = async (accesory: number ): Promise<IAccesoryBrand[]> => {
        debug('Starts the search for brands selling a certain type of accessory ');
        try {
            const result = await executeSQL(
                `SELECT
                    mp.mpr_descripcion as brandName,
                    mp.mpr_id as brandId
                FROM tr_data_base.marca_tipo_accesorio mta
                INNER JOIN tr_data_base.marca_producto mp
                     ON mp.mpr_id = mta.mtt_id_marca
                INNER JOIN tr_data_base.tipo_accesorio ta
                    ON ta.tac_id = mta.mtt_id_tipo_accesorio
                WHERE mta.mtt_id_tipo_accesorio = $accesory;`,
                QueryTypes.SELECT,
                { accesory }
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyBrandsOfSparePartsByTypeError = {
                    CodeError: 'SELECT-ACCESORY-BRANDS-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyBrandsOfSparePartsByTypeError);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-ACCESORY-BRANDS', Reason: err });
        }
    }
}