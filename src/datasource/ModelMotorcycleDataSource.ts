import debugLib from 'debug';
import { QueryTypes } from 'sequelize';
import { executeSQL } from '../database/database';
import { MessageError } from '../utilities/DebugUtilities';
import { ISearchConfig } from '../model/ISearchConfig';

const debug = debugLib('tc:ModelMotorcycleDataSource');

export default class ModelMotorcycleDataSource {


    public static readonly getModelMotorcycle = async (): Promise<ISearchConfig[]> => {
        debug('Starts the database query of the search model motorcycle');
        try {
                       const result = await executeSQL(
                `SELECT
                    mdmo_id as id,
                    mdmo_segmento as segmento,
                    mdmo_multimedia as multimedia
                FROM tr_data_base.Modelo_motocicleta;`,
                QueryTypes.SELECT,
                {}
            );
            if (result) {
                return Promise.resolve(result);
            } else {
                debug(`${MessageError}`, '404 TR_DATA_BASE'); // Ajustar el nombre de la base de datos
                const bodyErrorSearchConfigInfo = {
                    CodeError: 'SELECT-SEARCH-MODEL-MOTORCYCLE-404-DB',
                    Reason: 'BD error NOMBRE BASE DE DATOS', // Ajustar el nombre de la base de datos
                    StatusCode: '404',
                };
                return Promise.reject(bodyErrorSearchConfigInfo);
            }

        } catch (err) {
            debug(`[%s] ${MessageError}`, err);
            return Promise.reject({ Code: 'SELECT-SEARCH-MODEL-MOTORCYCLE', Reason: err });
        }
    }
}