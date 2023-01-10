import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import RequestLogger from '../utilities/RequestLogger';
import HTTP_STATUS_CODES from 'http-status';
import { DebugUtilities } from '../utilities/DebugUtilities';
import { ModelMotorcycleService } from '../services/ModelMotorcycleService';

const debug = debugLib('tc:ModelMotorcycleController');
const ModelMotorcycleController = Router();


ModelMotorcycleController.get(
    '/get-Model-motorcycle',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            console.log('hello')
            const response =  await ModelMotorcycleService.getModelMotorcycle();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-CoeController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default ModelMotorcycleController;