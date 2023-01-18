import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import HTTP_STATUS_CODES from 'http-status';
import { SparePartsService } from '../services/SparePartsService';
import { DebugUtilities } from '../utilities/DebugUtilities';
import RequestLogger from '../utilities/RequestLogger';

const debug = debugLib('tc:SparePartsController');
const SparePartsController = Router();


SparePartsController.get(
    '/motorcycles/get-motorcycles-brands',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            debug('ERROR: POST-SparePartsController: %j')
            const response =  await SparePartsService.getMotorcycleBrand();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-SparePartsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

SparePartsController.get(
    '/motorcycles/get-motorcycles-by-brand/:brand',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const brand = +req.params.brand;
            const response =  await SparePartsService.getMotorcyclebyBrand(brand);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-SparePartsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default SparePartsController;