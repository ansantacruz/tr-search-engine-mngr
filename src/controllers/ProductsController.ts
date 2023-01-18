import debugLib from 'debug';
import { Request, Response, Router } from 'express';
import HTTP_STATUS_CODES from 'http-status';
import { ProductsService } from '../services/ProductsService';
import { DebugUtilities } from '../utilities/DebugUtilities';
import RequestLogger from '../utilities/RequestLogger';

const debug = debugLib('tc:ProductsController');
const ProductsController = Router();


ProductsController.get(
    '/products/get-types',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const response =  await ProductsService.getProductsTypes();
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-ProductsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

ProductsController.get(
    '/products/get-category-by-produc-type/:producType',
    RequestLogger.basic,
    async (req: Request, res: Response) => {
        try {
            const producType = +req.params.producType;
            const response =  await ProductsService.getCategoryByProductTypes(producType);
            res.status(HTTP_STATUS_CODES.OK).send(response);
        } catch (err) {
            const error = DebugUtilities.error(err, 'Error');
            debug('ERROR: POST-ProductsController: %j', error.statusError);
            res.status(error.codeStatusError).send(error.statusError);
        }
    }
);

export default ProductsController;