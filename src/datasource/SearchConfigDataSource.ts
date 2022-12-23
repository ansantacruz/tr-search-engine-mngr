import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:SearchConfigDataSource');

export default class SearchConfigDataSource {


    public static readonly getSearchConfig = async (): Promise<ISearchConfig> => {
        debug('Starts the database query of the search configuration');
        try {
            const rqUid = 'test';
            const result = await executeSQL(
                `SELECT * from test t where r.requestId=$requestId;`,
                QueryTypes.SELECT,
                { requestId: rqUid }
            );
            if (result) {
                return Promise.resolve(result[0]);
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