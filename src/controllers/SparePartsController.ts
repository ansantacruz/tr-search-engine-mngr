import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import RequestLogger from '../utilities/RequestLogger';
import HTTP_STATUS_CODES from 'http-status';
import { DebugUtilities } from '../utilities/DebugUtilities';
import { SparePartsService } from '../services/SparePartsService';

const debug = debugLib('tc:SparePartsController');
const SparePartsController = Router();


SparePartsController.get(
    '/motorcycles/get-motorcycles-brands',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response =  await SparePartsService.getMotorcycleBrand();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-SparePartsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default SparePartsController;