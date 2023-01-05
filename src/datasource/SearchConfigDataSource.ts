import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:SearchConfigDataSource');

export default class SearchConfigDataSource {


    public static readonly getSearchConfig = async (): Promise<ISearchConfig[]> => {
        debug('Starts the database query of the search configuration');
        try {
            const rqUid = 'test';
            const result = await executeSQL(
                `SELECT
                    c.ciu_id as id,
                    c.ciu_descripcion as descripcion,
                    c.ciu_activo as estado
                FROM tr_data_base.ciudad c;`,
                QueryTypes.SELECT,
                {}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`[%s] ${MessageError}`, rqUid, '404 NOMBRE BASE DE DATOS '); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH_CONFIG-ENTITY-404-DB',
                    Reason: 'BD error NOMBRE BASE DE DATOS', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH_CONFIG-ENTITY', Reason: err });
        }
    }
}