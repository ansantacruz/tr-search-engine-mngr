import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import HTTP_STATUS_CODES from 'http-status';
import { MotorcycleAccessoriesService } from '../services/MotorcycleAccessoriesService';
import { DebugUtilities } from '../utilities/DebugUtilities';
import RequestLogger from '../utilities/RequestLogger';

const debug = debugLib('tc:MotorcycleAccessoriesController');
const MotorcycleAccessoriesController = Router();


MotorcycleAccessoriesController.get(
    '/accessories/get-brands-of-category/:category',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const category = +req.params.category;
            const response =  await MotorcycleAccessoriesService.getBrandsByCategory(category);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-brands-of-category/:category%j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);



MotorcycleAccessoriesController.get(
    '/accessories/get-propducts-by-brand/:productCategory/:brand',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const productCategory = +req.params.productCategory;
            const brand = +req.params.brand;
            const response =  await MotorcycleAccessoriesService.getProductsByBrand(productCategory, brand);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: GET-MotorcycleAccessoriesController: /accessories/get-brands-of-category/:category%j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);




export default MotorcycleAccessoriesController;