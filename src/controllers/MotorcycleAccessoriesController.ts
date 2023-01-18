import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import HTTP_STATUS_CODES from 'http-status';
import { MotorcycleAccessoriesService } from '../services/MotorcycleAccessoriesService';
import { DebugUtilities } from '../utilities/DebugUtilities';
import RequestLogger from '../utilities/RequestLogger';

const debug = debugLib('tc:MotorcycleAccessoriesController');
const MotorcycleAccessoriesController = Router();


MotorcycleAccessoriesController.get(
    '/accessories/get-types-of-accessories',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response =  await MotorcycleAccessoriesService.getTypeOfAccesories();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-types-of-accessories %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);


MotorcycleAccessoriesController.get(
    '/accessories/get-accesories-brands-by-type/:accesoryType',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const accesory = +req.params.accesoryType;
            const response = await MotorcycleAccessoriesService.getBrandsOfSparePartsByType(accesory);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-accesories-brands-by-type/:accesoryType %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default MotorcycleAccessoriesController;