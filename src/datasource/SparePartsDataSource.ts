import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { ISearchConfig } from '../model/ISearchConfig';
import { MessageError } from '../utilities/DebugUtilities';
import { IMotorcycle } from '../model/IMotorcycle';

const debug = debugLib('tc:SparePartsDataSource');

export default class SparePartsDataSource {


    public static readonly getMotorcycleBrand = async (): Promise<ISearchConfig[]> => {
        debug('Starts the database query of the search motorcycle brands');
        try {
                const result = await executeSQL(
                `SELECT
                    mmo_id as id,
                    mmo_descripcion as marca,
                    mmo_logo as logo
                FROM tr_data_base.marca_motocicleta;`,
                QueryTypes.SELECT,
                {}
            );
            if (result.length > 0) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH-MOTORCYCLE-BRANDS-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-MOTORCYCLE-BRANDS', Reason: err });
        }
    }

    public static readonly getMotorcyclebyBrand = async (brand: number): Promise<IMotorcycle[]> => {
        debug('Starts the database query of the search motorcycle by  brand');
        try {
            const result = await executeSQL(
                `SELECT
                    mo.mot_id as motorcycleId,
                    mo.mot_nombre as motorcycleName,
                    tpm.tmo_descripcion as motorcycleType,
                    mo.mot_logo as logo
                FROM tr_data_base.motocicleta mo
                INNER JOIN tr_data_base.tipo_motocicleta tpm
                    ON mo.mot_tipoMotocicleta=tpm.tmo_id
                WHERE mo.mot_marca=$brand;`,
                QueryTypes.SELECT,
                {brand}
            );
            if (result.length > 0) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE');
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH-MOTORCYCLE-BY_BRAND-404-DB',
                    Reason: 'BD error TR_DATA_BASE',
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-MOTORCYCLE-BY_BRAND', Reason: err });
        }
    }
}