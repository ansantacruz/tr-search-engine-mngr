import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:SparePartsDataSource');

export default class SparePartsDataSource {


    public static readonly getMotorcycleBrand = async (): Promise<ISearchConfig[]> => {
        debug('Starts the database query of the search motorcycle brands');
        try {
                       const result = await executeSQL(
                `SELECT
                    mmo_id as id,
                    mmo_nombre_marca as marca,
                    mmo_logo as logo
                FROM tr_data_base.marca_motocicleta;`,
                QueryTypes.SELECT,
                {}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH-MOTORCYCLE-BRANDS-404-DB',
                    Reason: 'BD error NOMBRE BASE DE DATOS', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-MOTORCYCLE-BRANDS', Reason: err });
        }
    }
}